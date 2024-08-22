
import java.util.*;

public class searching {

    static int No_Of_Chars = 256;

    private static void badCharHeuristic(char[] txt, int size, int[] badChars) {
        Arrays.fill(badChars, -1);

        for (int i = 0; i < size; i++) {
            badChars[(int) txt[i]] = i;
        }
    }

    public static void search(char[] txt, char[] pat) {
        int m = pat.length;
        int n = txt.length;

        int[] badChars = new int[No_Of_Chars];

        badCharHeuristic(pat, m, badChars);

        int s = 0;

        while (s <= (n - m)) {
            int j = m - 1;

            while (j >= 0 && pat[j] == txt[s + j]) {
                j--;
            }

            if (j < 0) {
                System.out.println("Pattern found at index: " + s);
                s += (s + m < n) ? m - badChars[txt[s + m]] : 1;
            } else {
                s += Math.max(1, j - badChars[txt[s + j]]);
            }
        }
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java searching <text> <pattern>");
            return;
        }

        String text = args[0];
        String pattern = args[1];

        search(text.toCharArray(), pattern.toCharArray());
    }
}
