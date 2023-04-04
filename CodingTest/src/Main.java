import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    static int n, m, k, c, result = 0;
    static Tree[][] arr;
    static PriorityQueue<Tree> queue = new PriorityQueue<>();
    static Queue<Tree> tree = new ArrayDeque<>();
    static int[][] dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    static int[][] crossDir = {{1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());
        k = Integer.parseInt(st.nextToken());
        c = Integer.parseInt(st.nextToken());
        arr = new Tree[n][n];
        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) {
                int cnt = Integer.parseInt(st.nextToken());
                boolean isTree = cnt != -1;
                arr[i][j] = new Tree(i, j, isTree, cnt, 0);
                if (isTree) {
                    tree.add(arr[i][j]);
                }
            }
        }
        print();
        for (int i = 0; i < m; i++) {
            // 성장
            int[][] growth = new int[n][n];
            tree.clear();
            for (int x = 0; x < n; x++) { // 정상적인 나무만 채집
                for (int y = 0; y < n; y++) {
                    Tree now = arr[x][y];
                    if (now.isTree) {
                        if (now.herbicideYear <= 0) // 제초제 없고
                        {
                            if (now.count > 0) { //  나무가 있을 경우
                                tree.add(now);
                            } else {
                                arr[x][y].herbicideYear--;
                            }
                        }
                    }
                }
            }
            // 제초제가 뿌려져 있거나 범위를 벗어나거나 나무가 아니라면, 나무 개수가 0개 이하라면 취급 안 함
            while (!tree.isEmpty()) {
                Tree now = tree.poll();
                int x = now.x;
                int y = now.y;
                int cnt = 0;
                for (int d = 0; d < 4; d++) { // 인접 네 개 나무여야 함
                    int nx = x + dir[d][0];
                    int ny = y + dir[d][1];
                    if (nx < 0 || ny < 0 || nx >= n || ny >= n || arr[nx][ny].herbicideYear > 0
                        || !arr[nx][ny].isTree || arr[nx][ny].count <= 0) {
                        continue;
                    }
                    cnt++;
                }
                growth[x][y] = cnt;
            }
            tree.clear();
            for (int x = 0; x < n; x++) {
                for (int y = 0; y < n; y++) {
                    if (growth[x][y] > 0) {
                        arr[x][y].count += growth[x][y]; // 나무 성장
                        tree.offer(arr[x][y]);
                    }
                }
            }

            System.out.println("성장 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            print();

            // 번식 => 나무 개수 / 인접 빈 칸의 개수
            int[][] add = new int[n][n];
            while (!tree.isEmpty()) {
                Tree now = tree.poll();
                int x = now.x;
                int y = now.y;
                int cnt = 0;
                for (int d = 0; d < 4; d++) { // 빈 칸 찾기
                    int nx = x + dir[d][0];
                    int ny = y + dir[d][1];
                    if (nx < 0 || ny < 0 || nx >= n || ny >= n || !arr[nx][ny].isTree
                        || arr[nx][ny].count > 0) {
                        continue;
                    }
                    cnt++;
                }
                if (cnt > 0) {
                    add[x][y] += now.count / cnt;
                }
            }
            for (int x = 0; x < n; x++) {
                for (int y = 0; y < n; y++) {
                    if(add[x][y] <= 0) continue;
                    for (int d = 0; d < 4; d++) { // 번식
                        int nx = x + dir[d][0];
                        int ny = y + dir[d][1];
                        if (nx < 0 || ny < 0 || nx >= n || ny >= n || !arr[nx][ny].isTree
                            || arr[nx][ny].count > 0) { // 빈 칸이 아니라면
                            continue;
                        }
                        arr[nx][ny].count += add[x][y];

                        tree.add(arr[nx][ny]);
                    }
                }
            }
            System.out.println("변식 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            print();
            // 제조체 뿌리기 => 대각선 k 만큼
            while (!tree.isEmpty()) {
                Tree now = tree.poll();
                int x = now.x;
                int y = now.y;
                int cnt = 0;
                for (int d = 0; d < 4; d++) { // 네 방향
                    for (int K = 0; K < k; K++) {
                        int nx = x + crossDir[d][0] * (K + 1);
                        int ny = y + crossDir[d][1] * (K + 1);
                        if (nx < 0 || ny < 0 || nx >= n || ny >= n || arr[nx][ny].isTree) {
                            break;
                        }
                        cnt += arr[nx][ny].count;
                    }
                }
                arr[x][y].destroy = cnt;
                queue.offer(arr[x][y]);
            }

            // c년만큼 제초제
            Tree max = queue.poll();
            result += max.destroy;
            int x = max.x;
            int y = max.y;
            int cnt = 0;
            for (int d = 0; d < 4; d++) {
                for (int K = 0; K < k; K++) {
                    int nx = x + dir[d][0] * (K + 1);
                    int ny = y + dir[d][1] * (K + 1);
                    if (nx < 0 || ny < 0 || nx >= n || ny >= n || arr[nx][ny].isTree) {
                        break;
                    }
                    arr[nx][ny].herbicideYear = c;
                }
            }
            System.out.println("제초제 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            print();
        }
        System.out.println(result);
    }

    public static class Tree implements Comparable<Tree> {

        boolean isTree;
        int x, y, count, destroy;
        int herbicideYear;

        public Tree(int x, int y, boolean isTree, int count, int herbicideYear) {
            this.x = x;
            this.y = y;
            this.isTree = isTree;
            this.count = count;
            this.herbicideYear = herbicideYear;
        }

        @Override
        public int compareTo(Tree o) {
            if (this.destroy == o.destroy) {
                if (this.x == o.x) {
                    return this.y - o.y; // 오름차순
                }
                return this.x - o.x; // 오름차순
            }
            return o.destroy - this.destroy; // 내림차순
        }
    }

    public static void print() {
        System.out.println("=================================");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(arr[i][j].herbicideYear > 0)
                    System.out.print("X"+"\t");
                else System.out.print(arr[i][j].count+"\t");
            }
            System.out.println();
        }
    }
}