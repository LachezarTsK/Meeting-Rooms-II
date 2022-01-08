
#include<vector>
#include<queue>
using namespace std;

class Solution {
public:

    static const int START = 0;
    static const int END = 1;

    int minMeetingRooms(vector<vector<int>>&intervals) {

        size_t size = intervals.size();
        priority_queue<int, vector<int>, greater<int>> endTime;
        sort(intervals.begin(), intervals.end(), sort_by_start_time);

        endTime.push(intervals[0][END]);

        for (int meeting = 1; meeting < size; meeting++) {
            if (endTime.top() <= intervals[meeting][START]) {
                endTime.pop();
            }
            endTime.push(intervals[meeting][END]);
        }

        return endTime.size();
    }

    static bool sort_by_start_time(const vector<int >& v1, const vector<int >& v2) {
        return v1[START] < v2[START];
    }
};
