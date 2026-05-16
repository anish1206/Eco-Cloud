import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

sns.set_theme(style="whitegrid", context="paper", font_scale=1.5)
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.family'] = 'serif'

os.makedirs('docs/images/paper_ready', exist_ok=True)

# 1. Relative Performance Bar Chart
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    df_agg = df_gen.groupby('policy')[['overall_score_mean', 'carbon_per_completed_job_mean', 'avg_jct_mean', 'tail_jct_mean']].mean()
    
    srtf_vals = df_agg.loc['srtf']
    ensemble_vals = df_agg.loc['ml_ensemble_green']
    
    # Calculate % difference from SRTF
    # Negative means Ensemble is lower (which is better)
    pct_diff = ((ensemble_vals - srtf_vals) / srtf_vals) * 100
    
    plt.figure(figsize=(10, 6))
    colors = ['green' if x < 0 else 'red' for x in pct_diff]
    
    # Pass hue and set legend to False to fix seaborn warning
    ax = sns.barplot(x=pct_diff.index, y=pct_diff.values, hue=pct_diff.index, palette=colors, legend=False)
    plt.axhline(0, color='black', linewidth=1.5)
    plt.title('Ensemble Performance vs SRTF Baseline (%)', weight='bold')
    plt.ylabel('% Difference (Negative = Better)')
    plt.xlabel('Evaluation Metrics')
    
    # Fix the xticklabels
    ax.set_xticks(range(len(pct_diff)))
    ax.set_xticklabels(['Overall Score', 'Carbon/Job', 'Avg JCT', 'Tail JCT'])
    
    for i, v in enumerate(pct_diff):
        ax.text(i, v + (0.5 if v > 0 else -1.5), f"{v:.1f}%", ha='center', weight='bold')
        
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig5_relative_performance.png')
    plt.close()
    print("Generated fig5_relative_performance.png")
except Exception as e:
    print("Error generating relative performance chart:", e)

# 2. Congestion Impact
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    
    sns.barplot(x='congestion', y='carbon_per_completed_job_mean', hue='policy', data=df_gen, ax=axes[0], palette='Set2')
    axes[0].set_title('Carbon Impact by Congestion Level', weight='bold')
    axes[0].set_ylabel('Carbon (kg CO2e/job)')
    axes[0].set_xlabel('Congestion')
    
    sns.barplot(x='congestion', y='avg_jct_mean', hue='policy', data=df_gen, ax=axes[1], palette='Set2')
    axes[1].set_title('Latency Impact by Congestion Level', weight='bold')
    axes[1].set_ylabel('Average JCT (hours)')
    axes[1].set_xlabel('Congestion')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig6_congestion_impact.png')
    plt.close()
    print("Generated fig6_congestion_impact.png")
except Exception as e:
    print("Error generating congestion chart:", e)

# 3. Tuning Tradeoffs Scatter
try:
    df_tune = pd.read_csv('data/optimal_tuning_summary.csv')
    plt.figure(figsize=(9, 6))
    sns.scatterplot(x='avg_jct_mean', y='carbon_per_completed_job_mean', hue='label', data=df_tune, s=150, palette='tab20')
    
    plt.title('Tuning Trade-offs: Latency vs Carbon', weight='bold')
    plt.xlabel('Average JCT (hours) - Lower is Better')
    plt.ylabel('Carbon per Job - Lower is Better')
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', fontsize='small')
    plt.grid(True, linestyle='--', alpha=0.7)
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig7_tuning_tradeoffs.png')
    plt.close()
    print("Generated fig7_tuning_tradeoffs.png")
except Exception as e:
    print("Error generating tuning tradeoffs chart:", e)

print("\nExtra informative figures successfully generated!")
