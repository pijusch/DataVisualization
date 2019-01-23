import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

x = pd.read_excel('EHRdataSample.xlsx')

plt.hist(x['Days_From1stTBI'])
plt.xlabel('Days_From1stTBI')
plt.ylabel('Count')
plt.show()
