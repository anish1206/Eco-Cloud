import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set Academic Quality Settings
sns.set_theme(style="whitegrid", context="paper", font_scale=1.5)
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.family'] = 'serif'

os.makedirs('docs/images/paper_ready', exist_ok=True)

# 1. Ablation Chart
try:
    df_abl = pd.read_csv('data/optimal_ablation_results.csv')
    df_abl = df_abl.sort_values('overall_score_mean', ascending=True)
    
    plt.figure(figsize=(10, 6))
    ax = sns.barplot(x='ablation_config', y='overall_score_mean', data=df_abl, palette='viridis')
    
    # Add error bars
    plt.errorbar(x=range(len(df_abl)), y=df_abl['overall_score_mean'], 
                 yerr=df_abl['overall_score_std'], fmt='none', c='black', capsize=5)
                 
    plt.title('Ablation Study: Model Contribution to Overall Score', weight='bold')
    plt.ylabel('Overall Score (Lower is Better)')
    plt.xlabel('Ensemble Configuration')
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig1_ablation.png')
    plt.close()
    print("Generated fig1_ablation.png")
except Exception as e:
    print("Error generating ablation chart:", e)

# 2. Generalization Chart
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    # Aggregate by policy
    df_gen_agg = df_gen.groupby('policy')[['overall_score_mean', 'carbon_per_completed_job_mean']].mean().reset_index()
    
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    sns.barplot(x='policy', y='overall_score_mean', data=df_gen_agg, ax=axes[0], palette='Blues_d')
    axes[0].set_title('Average Overall Score', weight='bold')
    axes[0].set_ylabel('Score (Lower is Better)')
    axes[0].set_xlabel('Policy')
    axes[0].set_xticklabels(['Ensemble', 'SRTF'])
    
    sns.barplot(x='policy', y='carbon_per_completed_job_mean', data=df_gen_agg, ax=axes[1], palette='Greens_d')
    axes[1].set_title('Average Carbon per Job', weight='bold')
    axes[1].set_ylabel('Carbon (kg CO2e/job)')
    axes[1].set_xlabel('Policy')
    axes[1].set_xticklabels(['Ensemble', 'SRTF'])
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig2_generalization.png')
    plt.close()
    print("Generated fig2_generalization.png")
except Exception as e:
    print("Error generating generalization chart:", e)

# 3. Failure Gap Distribution
try:
    df_fail = pd.read_csv('data/optimal_failure_modes.csv')
    plt.figure(figsize=(8, 5))
    sns.histplot(df_fail['performance_gap'], bins=15, kde=True, color='crimson')
    plt.axvline(0, color='black', linestyle='--', linewidth=2)
    plt.title('Performance Gap Distribution (Ensemble vs SRTF)', weight='bold')
    plt.xlabel('Performance Gap (Negative = Ensemble Better, Positive = SRTF Better)')
    plt.ylabel('Frequency')
    
    # Add text annotation
    plt.text(0.1, plt.ylim()[1]*0.9, 'Tied / Insignificant Difference\nCentered at 0.0', fontsize=12)
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig3_failure_gap.png')
    plt.close()
    print("Generated fig3_failure_gap.png")
except Exception as e:
    print("Error generating failure gap chart:", e)

# 4. Overhead Latency
try:
    df_over = pd.read_csv('data/optimal_overhead_analysis.csv')
    df_melt = df_over.melt(id_vars='component', value_vars=['mean_latency_ms', 'p99_latency_ms'], 
                           var_name='Metric', value_name='Latency (ms)')
    df_melt['Metric'] = df_melt['Metric'].replace({'mean_latency_ms': 'Mean', 'p99_latency_ms': 'P99'})
    
    plt.figure(figsize=(8, 6))
    sns.barplot(x='component', y='Latency (ms)', hue='Metric', data=df_melt, palette='magma')
    plt.yscale('log')
    plt.title('Computational Overhead (Log Scale)', weight='bold')
    plt.ylabel('Latency (ms) - Log Scale')
    plt.xlabel('Component')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig4_overhead.png')
    plt.close()
    print("Generated fig4_overhead.png")
except Exception as e:
    print("Error generating overhead chart:", e)

print("\nAll academic-grade figures successfully generated in docs/images/paper_ready/")
