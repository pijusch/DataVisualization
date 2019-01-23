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
    if x['Type of Injury Code'].iloc[i]== 'NSFINJ':
        a.append(x['Age'].iloc[i])
        b.append(x['PRE_max_days'].iloc[i])
        c.append(x['POST_max_days'].iloc[i])
    else:
        A.append(x['Age'].iloc[i])
        B.append(x['PRE_max_days'].iloc[i])
        C.append(x['POST_max_days'].iloc[i])

plt.scatter(a,b,c = 'red',label = 'NSFINJ')
plt.scatter(A,B,c = 'blue',label ='VCODE')
plt.legend()
plt.xlabel('Age')
plt.ylabel('PRE_max_days')
plt.show()

plt.scatter(a,c,c = 'red',label = 'NSFINJ')
plt.scatter(A,C,c = 'blue', label = 'VCODE')
plt.legend()
plt.xlabel('Age')
plt.ylabel('POST_max_days')
plt.show()

plt.scatter(b,c,c = 'red',label = 'NSFINJ')
plt.scatter(B,C,c = 'blue',label = 'VCODE')
plt.legend()
plt.xlabel('PRE_max_days')
plt.ylabel('POST_max_days')
plt.show()

points = 10000
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(a[:points],b[:points],c[:points],c = 'red',label = 'NSFINJ')
ax.scatter(A[:points],B[:points],C[:points],c = 'blue',label = 'VCODE')
plt.legend()
plt.xlabel('Age')
plt.ylabel('PRE_max_days')

plt.show()

