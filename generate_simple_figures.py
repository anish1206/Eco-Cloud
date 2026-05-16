import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

# Set absolute simplest, most professional academic style
# No custom font families, no wild color palettes.
sns.set_theme(style="white")
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300

os.makedirs('docs/images/paper_ready', exist_ok=True)

# 1. Ablation Chart
try:
    df_abl = pd.read_csv('data/optimal_ablation_results.csv')
    df_abl = df_abl.sort_values('overall_score_mean', ascending=True)
    
    plt.figure(figsize=(8, 5))
    # Simple uniform color
    sns.barplot(x='ablation_config', y='overall_score_mean', data=df_abl, color='steelblue')
    
    # Add error bars
    plt.errorbar(x=range(len(df_abl)), y=df_abl['overall_score_mean'], 
                 yerr=df_abl['overall_score_std'], fmt='none', c='black', capsize=5)
                 
    plt.title('Ablation Study: Overall Score by Configuration')
    plt.ylabel('Overall Score')
    plt.xlabel('Ensemble Configuration')
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig1_ablation.png')
    plt.close()
except Exception as e:
    pass

# 2. Generalization Chart
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    df_gen_agg = df_gen.groupby('policy')[['overall_score_mean', 'carbon_per_completed_job_mean']].mean().reset_index()
    
    fig, axes = plt.subplots(1, 2, figsize=(10, 4))
    
    sns.barplot(x='policy', y='overall_score_mean', data=df_gen_agg, ax=axes[0], color='steelblue')
    axes[0].set_title('Average Overall Score')
    axes[0].set_ylabel('Score')
    axes[0].set_xlabel('Policy')
    axes[0].set_xticks([0, 1])
    axes[0].set_xticklabels(['Ensemble', 'SRTF'])
    
    sns.barplot(x='policy', y='carbon_per_completed_job_mean', data=df_gen_agg, ax=axes[1], color='steelblue')
    axes[1].set_title('Average Carbon per Job')
    axes[1].set_ylabel('Carbon (kg CO2e/job)')
    axes[1].set_xlabel('Policy')
    axes[1].set_xticks([0, 1])
    axes[1].set_xticklabels(['Ensemble', 'SRTF'])
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig2_generalization.png')
    plt.close()
except Exception as e:
    pass

# 3. Failure Gap Distribution
try:
    df_fail = pd.read_csv('data/optimal_failure_modes.csv')
    plt.figure(figsize=(7, 4))
    sns.histplot(df_fail['performance_gap'], bins=15, kde=True, color='steelblue')
    plt.axvline(0, color='black', linestyle='--', linewidth=1.5)
    plt.title('Performance Gap Distribution')
    plt.xlabel('Performance Gap (Ensemble vs SRTF)')
    plt.ylabel('Frequency')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig3_failure_gap.png')
    plt.close()
except Exception as e:
    pass

# 4. Overhead Latency
try:
    df_over = pd.read_csv('data/optimal_overhead_analysis.csv')
    df_melt = df_over.melt(id_vars='component', value_vars=['mean_latency_ms', 'p99_latency_ms'], 
                           var_name='Metric', value_name='Latency (ms)')
    df_melt['Metric'] = df_melt['Metric'].replace({'mean_latency_ms': 'Mean', 'p99_latency_ms': 'P99'})
    
    plt.figure(figsize=(7, 4))
    sns.barplot(x='component', y='Latency (ms)', hue='Metric', data=df_melt, palette=['steelblue', 'lightgray'])
    plt.yscale('log')
    plt.title('Computational Overhead')
    plt.ylabel('Latency (ms) - Log Scale')
    plt.xlabel('Component')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig4_overhead.png')
    plt.close()
except Exception as e:
    pass

# 5. Relative Performance
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    df_agg = df_gen.groupby('policy')[['overall_score_mean', 'carbon_per_completed_job_mean', 'avg_jct_mean', 'tail_jct_mean']].mean()
    
    srtf_vals = df_agg.loc['srtf']
    ensemble_vals = df_agg.loc['ml_ensemble_green']
    pct_diff = ((ensemble_vals - srtf_vals) / srtf_vals) * 100
    
    plt.figure(figsize=(8, 4))
    # Simple grey/black color based on sign
    colors = ['#444444' if x < 0 else '#888888' for x in pct_diff]
    ax = sns.barplot(x=pct_diff.index, y=pct_diff.values, hue=pct_diff.index, palette=colors, legend=False)
    plt.axhline(0, color='black', linewidth=1)
    plt.title('Ensemble Performance Difference vs SRTF (%)')
    plt.ylabel('% Difference')
    plt.xlabel('Metrics')
    ax.set_xticks(range(len(pct_diff)))
    ax.set_xticklabels(['Overall Score', 'Carbon/Job', 'Avg JCT', 'Tail JCT'])
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig5_relative_performance.png')
    plt.close()
except Exception as e:
    pass

# 6. Congestion Impact
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    fig, axes = plt.subplots(1, 2, figsize=(10, 4))
    
    sns.barplot(x='congestion', y='carbon_per_completed_job_mean', hue='policy', data=df_gen, ax=axes[0], palette=['steelblue', 'lightgray'])
    axes[0].set_title('Carbon Impact by Congestion')
    axes[0].set_ylabel('Carbon (kg CO2e/job)')
    axes[0].set_xlabel('Congestion')
    
    sns.barplot(x='congestion', y='avg_jct_mean', hue='policy', data=df_gen, ax=axes[1], palette=['steelblue', 'lightgray'])
    axes[1].set_title('Latency Impact by Congestion')
    axes[1].set_ylabel('Average JCT (hours)')
    axes[1].set_xlabel('Congestion')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig6_congestion_impact.png')
    plt.close()
except Exception as e:
    pass

# 7. Tuning Tradeoffs Scatter
try:
    df_tune = pd.read_csv('data/optimal_tuning_summary.csv')
    plt.figure(figsize=(7, 4))
    
    sns.scatterplot(x='avg_jct_mean', y='carbon_per_completed_job_mean', hue='label', data=df_tune, s=100, palette='deep')
    
    plt.title('Tuning Trade-offs')
    plt.xlabel('Average JCT (hours)')
    plt.ylabel('Carbon per Job')
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(True, linestyle=':', alpha=0.5)
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig7_tuning_tradeoffs.png')
    plt.close()
except Exception as e:
    pass

print("Simple, uniform figures generated successfully.")
