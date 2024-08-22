
import java.util.*;

public class encoder {

    HashMap<Character, String> encoder;
    HashMap<String, Character> decoder;

    class Node implements Comparable<Node> {

        Character data;
        int cost;
        Node left;
        Node right;

        public Node(Character data, int cost) {
            this.data = data;
            this.cost = cost;
            this.left = null;
            this.right = null;
        }

        @Override
        public int compareTo(Node other) {
            return this.cost - other.cost;
        }
    }

    public encoder(String feeder) throws Exception {
        HashMap<Character, Integer> fmap = new HashMap<>();

        for (int i = 0; i < feeder.length(); i++) {
            if (fmap.containsKey(feeder.charAt(i))) {
                int cost = fmap.get(feeder.charAt(i));
                cost += 1;
                fmap.put(feeder.charAt(i), cost);
            } else {
                fmap.put(feeder.charAt(i), 1);
            }
        }

        PriorityQueue<Node> minHeap = new PriorityQueue<>();
        Set<Map.Entry<Character, Integer>> entrySet = fmap.entrySet();
        for (Map.Entry<Character, Integer> entry : entrySet) {
            Node newNode = new Node(entry.getKey(), entry.getValue());
            minHeap.add(newNode);
        }

        while (minHeap.size() >= 2) {
            Node first = minHeap.poll();
            Node second = minHeap.poll();

            Node combined = new Node('\0', first.cost + second.cost);
            combined.left = first;
            combined.right = second;
            minHeap.add(combined);
        }

        this.encoder = new HashMap<>();
        this.decoder = new HashMap<>();

        Node top = minHeap.poll();
        this.initEncoderDecoder(top, "");
    }

    private void initEncoderDecoder(Node node, String osf) {
        if (node == null) {
            return;
        } else if (node.left == null && node.right == null) {
            this.encoder.put(node.data, osf);
            this.decoder.put(osf, node.data);
        }
        initEncoderDecoder(node.left, osf + "0");
        initEncoderDecoder(node.right, osf + "1");
    }

    public String encode(String decoded) {
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < decoded.length(); i++) {
            ans.append(encoder.get(decoded.charAt(i)));
        }

        return ans.toString();
    }

    public String decode(String encoded) {
        StringBuilder key = new StringBuilder();
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < encoded.length(); i++) {
            key.append(encoded.charAt(i));
            if (decoder.containsKey(key.toString())) {
                ans.append(decoder.get(key.toString()));
                key.setLength(0);  // Clear the StringBuilder
            }
        }
        return ans.toString();
    }

    public static void main(String[] args) throws Exception {

        // if (args.length < 3) {
        //     System.out.println("Usage: java encoder <feeder> <encode|decode> <text>");
        //     return;
        // }
        String feeder = args[0];
        String mode = args[1];
        String text = args[2];

        //System.out.println(mode);
        encoder enc = new encoder(feeder);
        switch (mode) {
            case "encode" ->
                System.out.println(enc.encode(text));
            case "decode" ->
                System.out.println(enc.decode(text));
            default ->
                System.out.println("Unknown mode. Use 'encode' or 'decode'.");
        }
    }
}
