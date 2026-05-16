import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="white", context="paper")
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['axes.grid'] = True
plt.rcParams['grid.alpha'] = 0.3

df_tune = pd.read_csv('data/optimal_tuning_summary.csv')
plt.figure(figsize=(8, 4.5))

# Separate base model from the rest
df_base = df_tune[df_tune['label'] == 'base']
df_others = df_tune[df_tune['label'] != 'base']

# Plot others with a nice, visible but muted color (e.g., steelblue)
sns.scatterplot(x='avg_jct_mean', y='carbon_per_completed_job_mean', data=df_others, 
                color='steelblue', s=80, alpha=0.7, label='Alternative Tunings')

# Plot base with a highly visible color and marker (large crimson star)
sns.scatterplot(x='avg_jct_mean', y='carbon_per_completed_job_mean', data=df_base, 
                color='crimson', s=350, marker='*', edgecolor='black', linewidth=1.5, zorder=5, label='Proposed Ensemble')

plt.title('Tuning Trade-offs: Latency vs Carbon')
plt.xlabel('Average JCT (hours)')
plt.ylabel('Carbon per Job')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')

plt.tight_layout()
plt.savefig('docs/images/paper_ready/fig7_tuning_tradeoffs.png')
plt.close()
print("Fig 7 Updated successfully!")
