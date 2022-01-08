
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    final int START = 0;
    final int END = 1;

    public int minMeetingRooms(int[][] intervals) {

        int size = intervals.length;
        Arrays.sort(intervals, (x, y) -> (x[START] - y[START]));
        PriorityQueue<Integer> endTime = new PriorityQueue<>(size);

        endTime.add(intervals[0][END]);

        for (int meeting = 1; meeting < size; meeting++) {
            if (endTime.peek() <= intervals[meeting][START]) {
                endTime.poll();
            }
            endTime.add(intervals[meeting][END]);
        }

        return endTime.size();
    }
}
