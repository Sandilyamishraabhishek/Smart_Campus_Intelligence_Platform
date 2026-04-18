import random
import networkx as nx
import pandas as pd
from datetime import datetime, timedelta

def generate_synthetic_tx_data(num_wallets=100, num_transactions=500):
    """
    Generates synthetic DeFi transactions simulating normal and fraudulent behavior
    (like wash trading rings and sybil clusters).
    """
    wallets = [f"0x{i:040x}" for i in range(1, num_wallets + 1)]
    transactions = []
    
    start_time = datetime.now() - timedelta(days=7)
    
    # 1. Normal Transactions (Random pairs)
    for _ in range(int(num_transactions * 0.7)):
        sender = random.choice(wallets)
        receiver = random.choice(wallets)
        while sender == receiver:
             receiver = random.choice(wallets)
             
        transactions.append({
            "tx_hash": f"0x{random.getrandbits(256):064x}",
            "from_address": sender,
            "to_address": receiver,
            "amount": round(random.uniform(0.1, 50.0), 4),
            "timestamp": start_time + timedelta(minutes=random.randint(1, 10000)),
            "label": "Normal"
        })
        
    # 2. Wash Trading Ring (Circular flow A -> B -> C -> A)
    ring_size = 4
    ring_wallets = random.sample(wallets, ring_size)
    for i in range(30):
        sender = ring_wallets[i % ring_size]
        receiver = ring_wallets[(i + 1) % ring_size]
        transactions.append({
            "tx_hash": f"0x{random.getrandbits(256):064x}",
            "from_address": sender,
            "to_address": receiver,
            "amount": round(random.uniform(10.0, 15.0), 4), # Similar amounts
            "timestamp": start_time + timedelta(minutes=random.randint(1, 10000)),
            "label": "Suspicious (Wash Trading)"
        })
        
    # 3. Sybil Attack / Airdrop Farming (One to many, or Many to one)
    hub_wallet = random.choice(wallets)
    sybil_spokes = random.sample(wallets, 15)
    for spoke in sybil_spokes:
        transactions.append({
            "tx_hash": f"0x{random.getrandbits(256):064x}",
            "from_address": spoke,
            "to_address": hub_wallet,
            "amount": round(random.uniform(0.01, 0.05), 4), # Small consolidation
            "timestamp": start_time + timedelta(minutes=random.randint(1, 10000)),
            "label": "Suspicious (Sybil/Consolidation)"
        })

    df = pd.DataFrame(transactions)
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df

if __name__ == "__main__":
    df = generate_synthetic_tx_data()
    # Save to a local CSV file for the ML engine to pick up later
    import os
    os.makedirs('dataset', exist_ok=True)
    df.to_csv('dataset/synthetic_transactions.csv', index=False)
    print("Generated synthetic dataset at dataset/synthetic_transactions.csv")
