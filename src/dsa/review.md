---
title: 模板
category: 数据结构与算法
icon: carbon:review
---

## 输入输出

::: code-tabs

@tab 常规

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    while (scanner.hasNext()) {
        int n = scanner.nextInt();
        int m = scanner.nextInt();
        System.out.println("n: " + n + ", m: " + m);
    }
    scanner.close();
}
```

@tab 进阶

```java
public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StreamTokenizer in = new StreamTokenizer(br);
    PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
    while (in.nextToken() != StreamTokenizer.TT_EOF) {
        int n = (int) in.nval;
        in.nextToken();
        int m = (int) in.nval;
        out.println(n + m);
    }
    out.flush();
    br.close();
    out.close();
}
```

:::

## 工具类

::: code-tabs

@tab String

```java
length()  长度
charAt(int idx)  指定索引处的字符
substring(int l, int r)  截取 [l...r) 子串
indexOf(int ch)  指定字符首次出现的位置
lastIndexOf(int ch)  指定字符最后一次出现的位置
equalsIgnoreCase(String another)  与另一个 String 比较，不考虑大小写
startsWith(String prefix)  是否以指定的前缀开始
endsWith(String suffix)  是否以指定的后缀结束
toLowerCase()  转换为小写
toUpperCase()  转换为大写
toCharArray()  转为字符数组
trim()  忽略前后空白
replace(char oldChar, char newChar)  newChar 替换所有的 oldChar
split(String regex)  根据正则表达式的匹配拆分此字符串
contains(CharSequence s)  是否包含指定的 char 值序列
// 静态方法
String.valueOf(Object obj)  返回字符串表示形式
String.format(String format, Object... args)  返回格式化的字符串
String.join(CharSequence delimiter, CharSequence... elements)   连接元素成新字符串
String.copyValueOf(char[] data)  返回指定数组中表示该字符序列的 String
```

@tab StringBuilder

```java
append(...)  添加数据至末尾
insert(int offset, ...)  将数据插入到指定位置
deleteCharAt(int index)  删除指定位置的 char
delete(int start, int end)  删除指定区间字符
reverse()  反转序列
substring()  提取子串
replace()  替换子串
length()  返回长度（字符数）
setLength(int newLength)  设置字符序列的长度
charAt(int index)  返回指定索引处的 char 值
setCharAt(int index, char ch)  设置指定索引处的 char 值
toString()  返回此序列的字符串表示形式
```

@tab BigInteger

```java
add(BigInteger val)  加法
subtract(BigInteger val)  减法
multiply(BigInteger val)  乘法
divide(BigInteger val)  除法
mod(BigInteger m)  取余
pow(int exponent)  乘方
gcd(BigInteger val)  最大公约数
abs()  绝对值
negate()  相反数
bitLength()  位长度
bitCount()  二进制补码的位数
compareTo(BigInteger val)  大小比较
equals(Object x)  是否相等
toString(int radix)  转换为任意进制的字符串
BigInteger.valueOf(long val)  将 val 转换为 BigInteger
```

@tab LocalDate

```java
now()  当前日期
of(int year, int month, int dayOfMonth)  获取指定LocalDate对象
getYear()  年份
getMonth()  月份
getDayOfMonth()  月份中的第几天
getDayOfWeek()  星期中的第几天
isLeapYear()  是否是闰年
isBefore(LocalDate other)  是否在指定日期之前
isAfter(LocalDate other)  是否在指定日期之后
isEqual(LocalDate other)  是否与指定日期相等
plusDays(long daysToAdd)  此日期之后指定天数的日期
plusWeeks(long weeksToAdd)  此日期之后指定周数的日期
plusMonths(long monthsToAdd)  此日期之后指定月数的日期
plusYears(long yearsToAdd)  此日期之后指定年数的日期
minusDays(long daysToSubtract)  此日期之前指定天数的日期
minusWeeks(long weeksToSubtract)  此日期之前指定周数的日期
minusMonths(long monthsToSubtract)  此日期之前指定月数的日期
minusYears(long yearsToSubtract)  此日期之前指定年数的日期
```

@tab LocalTime

```java
now()  当前时间
of(int hour, int minute)  获取指定LocalTime对象
of(int hour, int minute, int second)  获取指定LocalTime对象
of(int hour, int minute, int second, int nanoOfSecond)  获取指定LocalTime对象
getHour()  小时
getMinute()  分钟
getSecond()  秒
getNano()  纳秒
isBefore(LocalTime other)  是否在指定时间之前
isAfter(LocalTime other)  是否在指定时间之后
plusHours(long hoursToAdd)  此时间之后指定小时数的时间
plusMinutes(long minutesToAdd)  此时间之后指定分钟数的时间
plusSeconds(long secondsToAdd)  此时间之后指定秒数的时间
plusNanos(long nanosToAdd)  此时间之后指定纳秒数的时间
minusHours(long hoursToSubtract)  此时间之前指定小时数的时间
minusMinutes(long minutesToSubtract)  此时间之前指定分钟数的时间
minusSeconds(long secondsToSubtract)  此时间之前指定秒数的时间
minusNanos(long nanosToSubtract)  此时间之前指定纳秒数的时间
```

@tab Math

```java
abs(int a)  绝对值
ceil(double a)  向上取整，返回大于或等于参数的最小整数
floor(double a)  向下取整，返回小于或等于参数的最大整数
round(float a)  四舍五入
min(int a, int b)  最小值
max(int a, int b)  最大值
sqrt(double a)  平方根
cbrt(double a)  立方根
pow(double a, double b)  a的b次幂
exp(double a)  欧拉数e的a次幂
log(double a)  自然对数（底数为e）
log10(double a)  以10为底的对数
sin(double a)  正弦值
cos(double a)  余弦值
tan(double a)  正切值
asin(double a)  反正弦值
acos(double a)  反余弦值
atan(double a)  反正切值
toDegrees(double angrad)  将弧度转换为度
toRadians(double angdeg)  将度转换为弧度
random()  返回一个介于0.0到1.0之间的随机数
```


@tab Random

```java
new Random()  创建新的随机数生成器
new Random(long seed)  创建新的随机数生成器并设置种子
setSeed(long seed)  设置随机数生成器的种子
nextBoolean()  生成一个布尔值
nextInt()  生成一个整数
nextInt(int bound)  生成一个在0（包含）到指定值（不包含）之间的整数
nextLong()  生成一个长整数
nextFloat()  生成一个浮点数
nextDouble()  生成一个双精度浮点数
nextGaussian()  生成一个服从高斯分布的双精度浮点数
```

:::

## Java集合

::: code-tabs

@tab ArrayList

```java
add(E e)  在列表末尾添加元素
add(int index, E element)  在指定位置添加元素
remove(int index)  移除指定位置的元素
get(int index)  获取指定位置的元素
set(int index, E element)  替换指定位置的元素
size()  获取元素数量
isEmpty()  是否为空
contains(Object o)  是否包含指定元素
indexOf(Object o)  指定元素第一次出现的位置
lastIndexOf(Object o)  指定元素最后一次出现的位置
clear()  清空
```


@tab ArrayDeque


```java
// 栈操作
push(E e)   // 入栈
pop()       // 移除并返回栈顶元素
peek()      // 返回栈顶元素，但不移除

// 队列操作
offer(E e)  // 入队
poll()      // 移除并返回队列头部元素
peek()      // 返回队列头部元素，但不移除

// 双端队列操作
offerFirst(E e) // 加到队列头部
offerLast(E e)  // 加到队列尾部
pollFirst()     // 移除并返回头部元素
pollLast()      // 移除并返回尾部元素
peekFirst()     // 返回头部元素，但不移除
peekLast()      // 返回尾部元素，但不移除

// 其他操作
size()
isEmpty() 
contains(Object o)
clear()
```

@tab PriorityQueue

```java
// 小根堆
new PriorityQueue<>();
// 大根堆
new PriorityQueue<>(Comparator.reverseOrder());
// 操作
offer(E e)  添加元素
poll()  移除并返回堆顶元素
peek()  返回堆顶元素，但不移除
size()  
isEmpty() 
contains(Object o)  
clear()  清空
```

@tab HashSet

```java
add(E e)  添加元素到集合
remove(Object o)  移除指定的元素
contains(Object o)  判断集合是否包含指定元素
size()  获取集合的元素数量
isEmpty()  判断集合是否为空
clear()  清空集合
```


@tab TreeSet

```java
add(E e)  添加元素到集合
remove(Object o)  移除指定的元素
contains(Object o)  判断集合是否包含指定元素
first()  最小元素
last()  最大元素
lower(E e)  小于e的最大元素
higher(E e)  大于e的最小元素
pollFirst()  移除并返回最小元素
pollLast()  移除并返回最大元素
size()  获取集合的元素数量
isEmpty()  判断集合是否为空
clear()  清空集合
```


@tab HashMap

```java
put(K key, V value)  添加键值对
get(Object key)  根据键，获取值
remove(Object key)  移除指定键的键值对
containsKey(Object key)  是否包含指定的键
containsValue(Object value)  是否包含指定的值
keySet()  返回映射中所有键的集合
values()  返回映射中所有值的集合
entrySet()  返回映射中所有键值对的集合
size()  获取键值对数量
isEmpty()  是否为空
clear()  清空
```

@tab TreeMap

```java
put(K key, V value)  添加键值对
get(Object key)  根据键，获取值
remove(Object key)  移除指定键的键值对
containsKey(Object key)  是否包含指定的键
containsValue(Object value)  是否包含指定的值
keySet()  所有键的集合
values()  所有值的集合
entrySet()  所有键值对的集合
firstKey()  最小的键
lastKey()  最大的键
lowerKey(K key)  小于给定键的最大键
higherKey(K key)  大于给定键的最小键
size()  获取键值对数量
isEmpty()  判断映射是否为空
clear()  清空映射
```

:::

## 常用数据结构

### 栈与队列

::: code-tabs

@tab 栈

```java
int[] stack = new int[1005];
int size = 0;
stack[size++] = val;    // push
return stack[--size];   // pop
return stack[size-1];   // peek
return 0 == size;       // isEmpty
```

@tab 队列

```java
int[] queue = new int[1005];
int l = 0, r = 0;
queue[r++] = val;   // offer
l++;                // poll
return queue[l];    // peek
return l == r;      // isEmpty
```

:::


### 并查集

::: code-tabs

@tab basis

```java
public static int MAXN = 10001;
public static int n;
public static int[] father = new int[MAXN];

public static void build() {
    for (int i = 0; i < n; i++) {
        father[i] = i;
    }
}

public static int find(int i) {
    if (i == father[i])
        return i;
    return father[i] = find(father[i]);
}

public static void union(int x, int y) {
    father[find(x)] = find(y);
}

public static boolean isSameSet(int x, int y) {
    return find(x) == find(y);
}
```

@tab sets

```java
public static int MAXN = 10001;
public static int sets; // 当前有多少个集合
public static int[] father = new int[MAXN];

public static void build(int n) {
    for (int i = 0; i < n; i++) {
        father[i] = i;
    }
    sets = n;
}

public static int find(int i) {
    if (i == father[i])
        return i;
    return father[i] = find(father[i]);
}

public static void union(int x, int y) {
    int fx = find(x);
    int fy = find(y);
    if (fx != fy) {
        father[fx] = fy;
        sets--;
    }
}
```

@tab labels

```java
public static int MAXN = 10001;
public static int n;
public static int[] father = new int[MAXN];
public static int[] size = new int[MAXN]; // 标签数组，设置集合属性，比如这里是集合的大小

public static void build() {
    for (int i = 0; i < n; i++) {
        father[i] = i;
        size[i] = 1;
    }
}

public static int find(int i) {
    if (i == father[i])
        return i;
    return father[i] = find(father[i]);
}

public static void union(int x, int y) {
    int fx = find(x);
    int fy = find(y);
    if (fx != fy) {
        father[fx] = fy;
        size[fy] += size[fx];
    }
}

public static int getSize(int x) { // 获取集合大小，只对集合代表元素有效
    return size[find(x)];
}
```

:::

### 前缀和

::: code-tabs

@tab 一维前缀和

```java
public static int[] s;  // s[i]: 前 i 个元素的和

public static void build(int[] nums, int n) {
    s = new int[n + 1];
    for (int i = 0; i < n; i++) {
        s[i+1] = s[i] + nums[i];
    }
}

public static int query(int i, int j) { // 区间 [i, j] 的元素累加和
    return s[j + 1] - s[i];
}
```

@tab 二维前缀和

```java
public static int[][] s; // s[i][j]：(0,0) 到 (i,j) 的矩阵和

public static void build(int[][] matrix, int m, int n) {
    s = new int[m+1][n+1];  // 补第0行、第0列，减少边界判断
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + matrix[i-1][j-1];
        }
    }
}

// 计算(x1, y1)到(x2, y2)形成的子矩阵的和
public static int query(int x1, int y1, int x2, int y2) {
    x2++;
    y2++;
    return s[x2][y2] - s[x1][y2] - s[x2][y1] + s[x1][y1];
}
```

:::

### 差分

::: code-tabs

@tab 一维差分

```java
static int n = 5;
static int[] arr = new int[n];
static int[] diff = new int[n+1];

// 区间[l, r]中每个数都加上x
public static void add(int[] d, int l, int r, int x) {
    d[l] += x; 
    d[r+1] -= x;
}

// 将diff数组刷一遍前缀和，然后再刷进原数组中
public static void getResult() {
    for(int i = 1; i<n; i++) {
        diff[i] += diff[i-1];
    }
    for(int i = 0; i<n; i++) {
        arr[i] += diff[i];
    }
}
```

@tab 二维差分

```java
public static void add(int x1, int y1, int x2, int y2, int x) {
    diff[ x1 ][ y1 ] += x;
    diff[x2+1][ y1 ] -= x;
    diff[ x1 ][y2+1] -= x;
    diff[x2+1][y2+1] += x;
}

public static void build() {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            diff[i][j] += diff[i - 1][j] + diff[i][j - 1] - diff[i - 1][j - 1];
        }
    }
}
```

@tab 等差数列差分

```java
// 初始时，[1...n] 范围内的所有数字均为0。
// 共进行 m 次操作，每次操作格式为(l,r,s,e,d)，
// 表示在 [l...r] 范围内，依次添加一个首项为s、末项为e、公差为d的等差数列
public static void add(int l, int r, int s, int e, int d) {
    arr[l] += s;
    arr[l+1] += d-s;
    arr[r+1] -= d+e;
    arr[r+2] += e;
}

public static void get() {
    for (int i = 1; i <= n; i++) {
        arr[i] += arr[i-1];
    }
    for (int i = 1; i <= n; i++) {
        arr[i] += arr[i-1];
    }
}
```

::: 


### 建图

:::code-tabs

@tab 邻接矩阵

```java
public static int MAXN = 11;
public static int[][] graph = new int[MAXN][MAXN];

public static void build(int n) {
    for (int i = 1; i <= n; i++) {
        Arrays.fill(graph[i], 1, n + 1, Integer.MAX_VALUE);
    }
}

public static void addEdge(int u, int v, int w) {
    graph[u][v] = w;
}
```

@tab 邻接表

```java
public static List<List<int[]>> adjList = new ArrayList<>();;

public static void build(int n) { 
    for (int i = 0; i < n; i++) {
        adjList.add(new ArrayList<>());
    }
}

public static void addEdge(int u, int v, int w) { 
    adjList.get(u).add(new int[]{v, w});
}

public static List<int[]> getNext(int u) {
    return adjList.get(u);
}
```

@tab 链式前向星

```java
public static int cnt;
public static int MAXN = 11;
public static int[] head = new int[MAXN];
public static int MAXM = 21;
public static int[] next = new int[MAXM];
public static int[] to = new int[MAXM];
public static int[] weight = new int[MAXM];

public static void build(int n) {
    cnt = 1; 
    Arrays.fill(head, 1, n + 1, 0);
}

public static void addEdge(int u, int v, int w) {
    next[cnt] = head[u]; 
    to[cnt] = v;
    weight[cnt] = w;
    head[u] = cnt++;
}

public static void traversal(int n) {
    for (int i = 1; i <= n; i++) {
        for (int ei = head[i]; ei > 0; ei = next[ei]) {
            // to[ei]	边的终点
            // weight[ei]	边的权重
        }
    }
}
```

:::


### 哈夫曼树

```java
public Node createHuffmanTree(int[] values) {
    PriorityQueue<Node> queue = new PriorityQueue<>();
    for (int value : values) {
        queue.offer(new Node(value));
    }
    while (queue.size() > 1) {
        Node node1 = queue.poll();
        Node node2 = queue.poll();
        Node parent = new Node(node1.value + node2.value);
        parent.left = node1;
        parent.right = node2;
        queue.offer(parent);
    }
    return queue.poll();
}
```

## 基础算法

### 回文串判断

```java
public static boolean isPalindrome(String s) {
    return new StringBuilder(s).reverse().toString().equals(s);
}
```

### 二分

::: code-tabs

@tab 经典二分

```java
// 查找有序数组nums中是否存在某个数tar
public static boolean isNumberInArray(int[] nums, int tar) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == tar) {
            return true;
        } else if (nums[mid] > tar) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return false;
}
```


@tab 查找左边界


```java
// 在有序数组 nums 中查询第一个值为 tar 的元素的下标
public static int findFirstIndex(int[] nums, int tar) {
    int ans = -1;
    int l = 0, r = nums.length - 1;
    while(l <= r) {
        int mid = l + (r - l) / 2;
        if(nums[mid] == tar) {
            ans = mid;
            r = mid - 1;
        } else if(nums[mid] > tar){
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}
```

@tab 查找右边界


```java
// 在有序数组 nums 中查询最后一个值为 tar 的元素的下标
public static int findLastIndex(int[] nums, int tar) {
    int ans = -1;
    int l = 0, r = nums.length - 1;
    while(l <= r) {
        int mid = l + (r - l) / 2;
        if(nums[mid] == tar) {
            ans = mid;
            l = mid + 1;
        } else if(nums[mid] > tar){
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}
```


@tab 查找>=tar的最左位置


```java
// 在有序数组 nums 中查找 >=tar 的最左位置，如果不存在，返回-1
public static int findLeftmostGreaterOrEqual(int[] nums, int tar) {
    int ans = -1;
    int l = 0, r = nums.length - 1;
    while(l <= r) {
        int mid = l + (r - l) / 2;
        if(nums[mid] >= tar) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}
```

@tab 查找<=tar的最右位置

```java
// 在有序数组 nums 中查找 <=tar 的最右位置，如果不存在，返回-1
public static int findRightmostLessOrEqual(int[] nums, int tar) {
    int ans = -1;
    int l = 0, r = nums.length - 1;
    while(l <= r) {
        int mid = l + (r - l) / 2;
        if(nums[mid] <= tar) {
            ans = mid;
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}
```

:::

### 排序

::: code-tabs

@tab 选择排序

```java
// [i...n-1]范围上找到最小值并放到i位置上，然后在[i-1...n-1]范围上继续
public static void selectionSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    for (int minIndex, i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
}
```

@tab 冒泡排序

```java
// [0...i]范围上，相邻位置较大的数滚下去，最大值来到i位置，然后[0...i-1]范围上继续
public static void bubbleSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    for (int end = arr.length - 1; end > 0; end--) {
        for (int i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
    }
}
```

@tab 插入排序

```java
// [0...i]范围上已经有序，新来的数从右到左滑到不能再小的位置，然后继续
public static void bubbleSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    for (int end = arr.length - 1; end > 0; end--) {
        for (int i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
    }
}
```

@tab 归并排序

```java
// 左部分排好序、右部分排好序、利用 merge 过程让左右整体有序
// merge 过程中谁小拷贝谁进辅助数组 help ，直到左右两部分所有的数字耗尽，拷贝回原数组 arr
public static int MAXN = 501;
public static int[] arr = new int[MAXN];
public static int[] help = new int[MAXN];

public static void mergeSort(int left, int right) {
    if (left == right) {
        return;
    }
    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
}

private static void merge(int left, int mid, int right) {
    int idx = left;
    int a = left;
    int b = mid + 1;
    while (a <= mid && b <= right) {
        help[idx++] = arr[a] <= arr[b] ? arr[a++] : arr[b++];
    }
    while (a <= mid) {
        help[idx++] = arr[a++];
    }
    while (b <= right) {
        help[idx++] = arr[b++];
    }
    for (idx = left; idx <= right; idx++) {
        arr[idx] = help[idx];
    }
}
```

@tab 快速排序

```java
// 随机选一个基准元素，然后将数组分为三部分，partition过程结束后
// first和last分别指向等于基准元素x的子数组的开始位置和结束位置
public static int MAXN = 501;
public static int first, last; // 等于x的左右边界
public static int[] arr = new int[MAXN];

public static void quickSort(int l, int r) {
    if (l >= r)
        return;

    int x = arr[l + (int)(Math.random() * (r - l + 1))];
    partition(l, r, x);
    
    int left = first, right = last;
    quickSort(l, left - 1);
    quickSort(right + 1, r);
}

// 荷兰国旗问题优化：三向切分
public static void partition(int l, int r, int x) {
    first = l;
    last = r;
    int i = l;
    while (i <= last) {
        if (arr[i] == x) {
            i++;
        } else if (arr[i] < x) {
            swap(first++, i++);
        } else {
            swap(i, last--);
        }
    }
}
```

@tab 堆排序

```java
// 首先将待排序的序列构造成一个大顶堆，然后将堆顶元素与末尾元素交换并从堆中移除
// 再调整剩余元素成为新的大顶堆，重复这个过程
public static int MAXN = 501;
public static int[] arr = new int[MAXN];
public static int n;

public static void heapSort() {
    for (int i = n - 1; i >= 0; i--) {
        heapify(i, n);
    }
    int size = n;
    while (size > 1) {
        swap(0, --size);
        heapify(0, size);
    }
}

public static void heapify(int idx, int size) { // 向下调整堆
    int left = idx * 2 + 1;
    while (left < size) {
        int best = left + 1 < size && arr[left + 1] > arr[left] ? left + 1 : left;
        best = arr[best] > arr[idx] ? best : idx;
        if (best == idx) {
            break;
        }
        swap(best, idx);
        idx = best;
        left = idx * 2 + 1;
    }
}

public static void swap(int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
```

:::

### 排列组合

::: code-tabs

@tab 全排列

```java
public static char[] arr = {'1', '2', '3'};
public static List<String> ans = new ArrayList<>();

public static void main(String[] args) {
    getPerms(0);
    System.out.println(ans); // [123, 132, 213, 231, 321, 312]
}

public static void getPerms(int i) {
    if (i == arr.length) {
        ans.add(String.valueOf(arr));
        return;
    }
    for (int j = i; j < arr.length; j++) {
        swap(i, j);
        getPerms(i + 1);
        swap(i, j);	// 关键点：回溯
    }
}

public static void swap(int i, int j) {
    char tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
```


@tab 所有可能的组合

```java
public static char[] arr = { '1', '2', '2' }; // 待组合的数组
public static List<String> ans = new ArrayList<>();

public static void main(String[] args) {
    Arrays.sort(arr); // 排序，确保相同元素相邻
    allCombination(0, new int[arr.length], 0);
    System.out.println(ans); // [, 2, 22, 1, 12, 122]
}

/**
 * 递归生成所有组合
 * @param idx 当前处理的元素下标
 * @param c 存储当前组合的数组
 * @param cnt 当前已经选了几个数
 */
public static void allCombination(int idx, int[] c, int cnt) {
    if (idx == arr.length) { // 已经遍历完所有元素，将当前组合加入到答案中
        ans.add(new String(c, 0, cnt));
        return;
    }

    int nIdx = idx + 1; // 下一个不同元素的下标
    while (nIdx < arr.length && arr[idx] == arr[nIdx]) {
        nIdx++;
    }
    // 当前数 arr[idx] 选0个
    allCombination(nIdx, c, cnt);
    // 当前数 arr[idx] 选1个、选2个...
    while (idx < nIdx) {
        c[cnt++] = arr[idx++];
        allCombination(nIdx, c, cnt);
    }
}
```

@tab 预处理组合数

```java
private static final int n = 10010, m = 15;
private static final int[][] C = new int[n][m];
private static final int MOD = 1_000_000_007;

static {
    C[0][0] = 1;
    for (int i = 1; i < n; i++) {
        C[i][0] = 1;
        for (int j = 1; j < m; j++) {
            C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % MOD;
        }
    }
}
```

@tab 卡特兰数

```java
public static long catalan(int n) {
    long res = 1;

    for (int i = 0; i < n; i++) {
        res = res * 2 * (2 * i + 1) / (i + 2);
    }

    return res;
}
```

:::

::: tip 放球问题

把 $m$ 个无区别的小球放入 $n$ 个有区别的盒子，允许空盒，方案数为  $C_{m+n-1}^{n-1} = C_{m+n-1}^{m}$

:::

### 动态规划

::: code-tabs

@tab 01背包

```java
// dp[i][j]: 前i个物品装入容量为j的背包中，获得的最大收益
public static int solve1(int n, int C, int[] c, int[] w) {
    int[][] dp = new int[n + 1][C + 1];
    for(int i = 1; i <= n; i++) { 
        for(int j = 0; j <= C; j++) { 
            if(c[i] <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - c[i]] + w[i]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[n][C];
}

// 空间优化
public static int solve2(int n, int C, int[] c, int[] w) {
    int[] dp = new int[C + 1];
    for(int i = 1; i <= n; i++) { 
        for(int j = C; j>=c[i]; j--) { 
            dp[j] = Math.max(dp[j], dp[j-c[i]] + w[i]);
        }
    }
    return dp[C];
}
```

@tab 分组背包


```java
// dp[i][j]: 前i组物品每组最多挑一个，装入容量为j的背包，最大收益是多少
public static int solve1(int n, int C, int[][] c, int[][] w) {
    int[][] dp = new int[n + 1][C + 1];
    for(int i = 1; i <= n; i++) {
        for(int j = 0; j <= C; j++) {
            for(int k = 0; k < c[i].length; k++) {
                if(c[i][k] <= j) {
                    dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - c[i][k]] + w[i][k]);
                }
            }
        }
    }
    return dp[n][C];
}

// 空间优化
public static int solve2(int n, int C, int[][] c, int[][] w) {
    int[] dp = new int[C + 1];
    for(int i = 1; i <= n; i++) {
        for(int j = C; j >= 0; j--) {
            for(int k = 0; k < c[i].length; k++) {
                if(c[i][k] <= j) {
                    dp[j] = Math.max(dp[j], dp[j - c[i][k]] + w[i][k]);
                }
            }
        }
    }
    return dp[C];
}
```


@tab LCS

```java
// dp[i][j]：text1的前i个字符和text2的前j个字符的最长公共子序列的长度
public int LCS(String text1, String text2) {
    int n = text1.length();
    int m = text2.length();
    int[][] dp = new int[n + 1][m + 1];

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[n][m];
}
```

@tab 编辑距离

```java
// dp[i][j]：word1的前i个字符和word2的前j个字符之间的最小编辑距离
public int minDistance(String word1, String word2) {
    int n = word1.length();
    int m = word2.length();
    int[][] dp = new int[n + 1][m + 1];

    for (int i = 0; i <= n; i++) {
        dp[i][0] = i;
    }

    for (int j = 0; j <= m; j++) {
        dp[0][j] = j;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
            }
        }
    }

    return dp[n][m];
}
```


@tab 子集和问题

```java
// dp[i][j]：在前i个元素中是否存在一个子集，其子集和等于j
public boolean canFindSum(int[] S, int M) {
    int n = S.length;
    boolean[][] dp = new boolean[n + 1][M + 1];
    dp[0][0] = true;

    for (int i = 1; i <= n; i++) {
        dp[i][0] = true;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= M; j++) {
            if (j >= S[i - 1]) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - S[i - 1]];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[n][M];
}
```


@tab 行走问题

```java
// dp[i][j]：从矩阵的左上角到位置(i, j)的所有可能的路径数量
public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];

    for (int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }

    for (int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}
```

@tab 最长递增路径

```java
// 给定一个矩阵，找一条最长路径，要求路径上的数字递增：
private static final int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
private int n, m;

public int longestIncreasingPath(int[][] matrix) {
    if (matrix.length == 0) return 0;
    n = matrix.length;
    m = matrix[0].length;
    int[][] cache = new int[n][m];
    int max = 1;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            max = Math.max(max, dfs(matrix, i, j, cache));
    return max;
}

// 记忆化搜索
private int dfs(int[][] matrix, int i, int j, int[][] cache) {
    if (cache[i][j] != 0)
        return cache[i][j];
    for (int[] dir : dirs) {
        int x = i + dir[0], y = j + dir[1];
        if (x >= 0 && x < n && y >= 0 && y < m && matrix[x][y] > matrix[i][j])
            cache[i][j] = Math.max(cache[i][j], dfs(matrix, x, y, cache));
    }
    return ++cache[i][j];
}
```

:::

## 图论

### 最短路径

::: code-tabs

@tab Dijkstra

```java
public static int[] dijkstra(int[][] edges, int n, int k) {
    List<int[]>[] g = new ArrayList[n+1];
    Arrays.setAll(g, e->new ArrayList<>());
    for (int[] edge : edges) {
        //  源节点                  目标节点   权重
        g[edge[0]].add(new int[] {edge[1], edge[2]});
    }
    int[] dist = new int[n+1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    boolean[] vis = new boolean[n + 1];
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    heap.add(new int[] { k, 0 });

    while (!heap.isEmpty()) {
        int u = heap.poll()[0];
        if (vis[u]) {
            continue;
        }
        vis[u] = true;
        for (int[] edge : g[u]) {
            int v = edge[0];
            int w = edge[1];
            int cost = dist[u] + w;
            if (!vis[v] && cost < dist[v]) {
                dist[v] = cost;
                heap.add(new int[] { v, cost });
            }
        }
    }
    return dist;
}
```


@tab Floyd

```java
public void floyd(int[][] dist, int n) {
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}
```

:::



### 拓扑排序

::: code-tabs

@tab 入度为0法

```java
public static int[] topoSort(int n, int[][] edges) {
    List<Integer>[] g = new ArrayList[n];
    Arrays.setAll(g, e->new ArrayList<>());
    int[] in = new int[n];
    for(int[] edge : edges) {
        g[edge[1]].add(edge[0]);
        in[edge[0]]++;
    }
    int[] queue = new int[n];
    int l = 0, r = 0;
    for(int i = 0; i<n; i++)
        if(in[i] == 0)
            queue[r++] = i;
    
    int cnt = 0;
    while(l < r) {
        int cur = queue[l++];
        cnt++;
        for(int next : g[cur]) {
            if(--in[next] == 0) {
                queue[r++] = next;
            }
        }
    }
    return cnt == n ? queue : new int[0];
}
```

:::

### 最小生成树

::: code-tabs

@tab Kruskal

```java
// 返回最小生成树的最小权值和
public int kruskal(int n, int[][] edges) {
    Arrays.sort(edges, (a, b) -> a[2] - b[2]); // 按照权值从小到大排序
    int ans = 0;
    int edgeCnt = 0;
    for (int[] edge : edges) {
        // 如果该边的两个节点属于不同集合，则成功合并
        if (union(edge[0], edge[1])) {
            edgeCnt++;
            ans += edge[2];
        }
    }
    return edgeCnt == n-1 ? ans : -1;
}
```

:::

## 数学

### 质数

::: code-tabs

@tab 质数判断

```java
public static boolean isPrime1(long n) {
    if (n <= 1) {
        return false;
    }
    for (long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

public static boolean isPrime2(String str) {
    BigInteger n = new BigInteger(str);
    return n.isProbablePrime(11); // 测试11次
}
```

@tab 求n的所有质因子

```java
public static void primeFactors(int n) {
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            System.out.println(i);
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    if (n > 1) {
        System.out.println(n);
    }
}
```

@tab 质数筛

```java
// 求 [1...n] 范围上的所有质数
public static int ehrlich(int n) {
    boolean[] visit = new boolean[n + 1];// true：合数，false：质数
    
    for (int i = 2; i * i <= n; i++) {
        if (!visit[i]) {
            for (int j = i * i; j <= n; j += i) {
                visit[j] = true;
            }
        }
    }
    
    int cnt = 0;
    for (int i = 2; i <= n; i++) {
        if (!visit[i]) {
            cnt++; // 可统计或收集
        }
    }
    return cnt;
}
```

:::

### GCD与LCM

::: code-tabs

@tab GCD

```java
public static long gcd(long a, long b) {    // 最大公约数
    return b == 0 ? a : gcd(b, a % b);
}
```

@tab LCM

```java
public static long lcm(long a, long b) {    // 最小公倍数
    return a / gcd(a, b) * b;
}
```

:::


### 快速幂

::: code-tabs

@tab 乘法快速幂

```java
public long quickMul(long a, long n, long mod) { // a^b % p
    long result = 1;
    while (n > 0) {
        if ((n & 1) == 1) {
            result = result * a % mod;
        }
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}
```

@tab 矩阵快速幂

```java
public static int[][] matrixFastPower(int[][] A, int n) {// A的n次方
    int[][] result = new int[A.length][A[0].length];
    for (int i = 0; i < A.length; i++) {
        result[i][i] = 1;	// 对角线为1（单位矩阵）
    }

    while (n > 0) {
        if ((n & 1) == 1) {
            result = matrixMultiply(result, A);
        }
        A = matrixMultiply(A, A);
        n >>= 1;
    }

    return result;
}

public static int[][] matrixMultiply(int[][] A, int[][] B) {// 矩阵相乘，A的列数必须等于B的行数
    int rows = A.length;
    int cols = B[0].length;
    int[][] result = new int[rows][cols];

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            for (int k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}
```

::: 

### 取模


::: code-tabs

@tab 加法、减法、乘法

```java
// 加
(a + b) % MOD == (a % MOD + b % MOD) % MOD
// 减
(a - b) % MOD == (a % MOD - b % MOD + MOD) % MOD
// 乘
(a * b) % MOD == (a % MOD * b % MOD) % MOD
```

@tab 减法（需要求逆元）

```java
// power：乘法快速幂
(a / b) % MOD = ( (a % MOD) * power(b, MOD-2) ) % MOD
```

@tab 组合数取模

```java
static long lucas(int n, int m) { // 使用卢卡斯定理计算 C(n, m) mod p
    if (m == 0) {
        return 1;
    }
    return C(n % MOD, m % MOD) * lucas(n / MOD, m / MOD) % MOD;
}
```

:::

### 公平组合游戏

::: code-tabs

@tab 巴什博弈

```java
// 有 n 个石头，俩人轮流拿，每次可拿 1~m 个石头，拿到最后一颗石头的人获胜
// 给定 n 和 m，问最后谁赢
public static String compute(int n, int m) {
    return n % (m + 1) != 0 ? "先手赢" : "后手赢";
}
```

@tab 巴什博弈扩展

```java
// 有 n 个石头，俩人轮流拿，每次可拿 p 的 k 次方颗石子
// 其中 p 和 k 必须满足 p 是质数、k 是自然数，拿到最后一颗石头的人获胜
// 给定 n 颗石头，问最后谁赢
public static String compute(int n) {
    return n % 6 != 0 ? "先手赢" : "后手赢";
}
```

@tab 尼姆博弈

```java
// 有 n 堆石头，俩人轮流选择某堆非空石头，移除该堆石头的任意正数个石头
// 谁先拿走最后的石头就获胜
public static String compute(int n, int[] nums) {
    int eor = 0;
    for (int j = 0; j < n; j++) {
        eor ^= nums[j];
    }
    return eor != 0 ? "先手赢" : "后手赢";
}
```

@tab 反尼姆博弈

```java
// 有 n 堆石头，俩人轮流选择某堆非空石头，移除该堆石头的任意正数个石头
// 谁先拿走最后的石头就【失败】
public static String compute(int n) {
    int eor = 0, sum = 0;
    for (int i = 0; i < n; i++) {
        eor ^= stones[i];
        sum += stones[i] == 1 ? 1 : 0;
    }
    if (sum == n) {
        return (n & 1) == 1 ? "后手赢" : "先手赢";
    } else {
        return eor != 0 ? "先手赢" : "后手赢";
    }
}
```

@tab 威佐夫博弈

```java
// 有两堆石头，数量任意，记为 a 和 b，俩人轮流取石头，策略有两种：
// 1. 在任意的一堆中取走任意多的石子
// 2. 在两堆中同时取走相同数量的石子
// 最终把石头全部取完的人获胜
public static String compute(int a, int b) {
    double split = (Math.sqrt(5.0) + 1.0) / 2.0; // 黄金分割比例
    int min = Math.min(a, b);
    int max = Math.max(a, b);
    int p = (int) (split * (max - min));
    return min != p ? "先手赢" : "后手赢";
}
```


:::


## 位运算操作

::: code-tabs

@tab bitCount

```java
// 计算比特位中 1 的数量
public static int bitCount(int n){
    int count = 0;
    while(n > 0) {
        n = n & (n-1); // 移除二进制位中最右边的1（最低位的1）
        count++;
    }
    return count;
}
```

@tab lowBit

```java
// 返回比特位中最低位的1
public static int lowBit(int n) {
    return n & (-n);
}
```

@tab subsets

```java
// 遍历n个元素的集合的全部子集状态
public static void subsets(char arr[]) {
    int n = arr.length;
    for (int set = 0; set < (1 << n); ++set) { // set : [0...2^n)
        for (int j = 0; j < n; ++j) {
            if (((1 << j) & set) > 0) { // 将比特位为 1 的元素加入当前子集
                System.out.print(arr[j] + " ");
            }
        }
        System.out.println();
    }
}
```


@tab bitTraverse

```java
// 从最低位开始，诸位遍历二进制比特位
public static void bitTraverse(int n) {
    while (n != 0) {
        int lowestBit = n & 1;
        System.out.println(lowestBit);

        n = n >> 1; // 舍去最低位
    }
}
```


@tab getBit

```java
// 取出整数 n 在二进制表示下的第 k 位的值
public static int getBit(int n, int k) {
    return (n >> k) & 1;
}
```


@tab flipKthBit

```java
// 将第k位比特位取反
public static int flipKthBit(int n, int k) {
    return n ^ (1 << k);
}
```

@tab setBitToOne

```java
// 对整数 n 在二进制表示下表示的第 k 位赋值 1
public static int setBitToOne(int n, int k) {
    return n | (1 << k);
}
```


@tab setBitToZero

```java
// 对整数 n 在二进制表示下表示的第 k 位赋值 0
public static int setBitToZero(int n, int k) {
    return n & (~(1 << k));
}
```

:::