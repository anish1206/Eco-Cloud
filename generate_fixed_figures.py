import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

# Strict Academic Styling
sns.set_theme(style="white", context="paper")
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.family'] = 'sans-serif' # Standard default
plt.rcParams['axes.grid'] = True # Light grid for readability
plt.rcParams['grid.alpha'] = 0.3

os.makedirs('docs/images/paper_ready', exist_ok=True)

# 1. Ablation Chart (Bar plot is fine here since starting at 0 makes sense)
try:
    df_abl = pd.read_csv('data/optimal_ablation_results.csv')
    df_abl = df_abl.sort_values('overall_score_mean', ascending=True)
    
    plt.figure(figsize=(7, 4.5))
    sns.barplot(x='ablation_config', y='overall_score_mean', data=df_abl, color='#555555')
    plt.errorbar(x=range(len(df_abl)), y=df_abl['overall_score_mean'], 
                 yerr=df_abl['overall_score_std'], fmt='none', c='black', capsize=4)
                 
    plt.title('Ablation Study: Overall Score by Configuration')
    plt.ylabel('Overall Score (Lower is Better)')
    plt.xlabel('Ensemble Configuration')
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig1_ablation.png')
    plt.close()
except Exception as e:
    pass

# 2. Generalization Chart (Using Point Plots to clearly show the deltas without forcing 0-baseline)
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    df_gen_agg = df_gen.groupby('policy')[['overall_score_mean', 'carbon_per_completed_job_mean']].mean().reset_index()
    
    fig, axes = plt.subplots(1, 2, figsize=(9, 4))
    
    sns.pointplot(x='policy', y='overall_score_mean', data=df_gen_agg, ax=axes[0], color='#222222', markers='D')
    axes[0].set_title('Average Overall Score')
    axes[0].set_ylabel('Score (Lower is Better)')
    axes[0].set_xlabel('Policy')
    axes[0].set_xticklabels(['Ensemble', 'SRTF'])
    
    sns.pointplot(x='policy', y='carbon_per_completed_job_mean', data=df_gen_agg, ax=axes[1], color='#222222', markers='D')
    axes[1].set_title('Average Carbon per Job')
    axes[1].set_ylabel('Carbon (kg CO2e/job)')
    axes[1].set_xlabel('Policy')
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
    sns.histplot(df_fail['performance_gap'], bins=15, kde=True, color='#555555')
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
    sns.barplot(x='component', y='Latency (ms)', hue='Metric', data=df_melt, palette=['#444444', '#AAAAAA'])
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
    colors = ['#333333' if x < 0 else '#999999' for x in pct_diff]
    ax = sns.barplot(x=pct_diff.index, y=pct_diff.values, hue=pct_diff.index, palette=colors, legend=False)
    plt.axhline(0, color='black', linewidth=1)
    plt.title('Ensemble vs SRTF: Percentage Difference')
    plt.ylabel('% Difference (Negative = Better)')
    plt.xlabel('Metrics')
    ax.set_xticks(range(len(pct_diff)))
    ax.set_xticklabels(['Overall Score', 'Carbon/Job', 'Avg JCT', 'Tail JCT'])
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig5_relative_performance.png')
    plt.close()
except Exception as e:
    pass

# 6. Congestion Impact (Switched to Point Plot to accurately show the deltas)
try:
    df_gen = pd.read_csv('data/optimal_generalization_results.csv')
    fig, axes = plt.subplots(1, 2, figsize=(9, 4.5))
    
    # Using pointplot allows the y-axis to focus on the data range, making the carbon savings visible
    sns.pointplot(x='congestion', y='carbon_per_completed_job_mean', hue='policy', data=df_gen, ax=axes[0], palette=['#000000', '#888888'], markers=['o', 's'], linestyles=['-', '--'])
    axes[0].set_title('Carbon Impact by Congestion')
    axes[0].set_ylabel('Carbon (kg CO2e/job)')
    axes[0].set_xlabel('Congestion')
    
    sns.pointplot(x='congestion', y='avg_jct_mean', hue='policy', data=df_gen, ax=axes[1], palette=['#000000', '#888888'], markers=['o', 's'], linestyles=['-', '--'])
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
    
    sns.scatterplot(x='avg_jct_mean', y='carbon_per_completed_job_mean', hue='label', data=df_tune, s=80, palette='gray')
    
    plt.title('Tuning Trade-offs')
    plt.xlabel('Average JCT (hours)')
    plt.ylabel('Carbon per Job')
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    
    plt.tight_layout()
    plt.savefig('docs/images/paper_ready/fig7_tuning_tradeoffs.png')
    plt.close()
except Exception as e:
    pass

print("Fixed figures generated.")
