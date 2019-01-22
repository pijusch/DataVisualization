import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import axes3d, Axes3D
x = pd.read_excel('EHRdataSample.xlsx')

a = []
b = []
c = []
A = []
B = []
C = []

for i in range(len(x)):
    if x['Type of Injury Code'].iloc[i]== 'VCODE':
        a.append(x['Age'].iloc[i])
        b.append(x['PRE_max_days'].iloc[i])
        c.append(x['POST_max_days'].iloc[i])
    else:
        A.append(x['Age'].iloc[i])
        B.append(x['PRE_max_days'].iloc[i])
        C.append(x['POST_max_days'].iloc[i])

plt.scatter(a,b,c = 'red')
plt.scatter(A,B,c = 'blue')
plt.show()

plt.scatter(a,c,c = 'red')
plt.scatter(A,C,c = 'blue')
plt.show()

plt.scatter(b,c,c = 'red')
plt.scatter(B,C,c = 'blue')
plt.show()

points = 1000
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(a[:points],b[:points],c[:points],c = 'red')
ax.scatter(A[:points],B[:points],C[:points],c = 'blue')

plt.show()

