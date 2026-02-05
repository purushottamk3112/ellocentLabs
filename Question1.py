#  Given a list of meeting time intervals, where each interval has a start time and an end time, find the minimum number of meeting rooms required so that no meetings overlap.
# Example
# Input
# [(0, 30), (5, 10), (15, 20)]

# Output
# 2
def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    used_rooms = 0
    max_rooms = 0
    s_ptr, e_ptr = 0, 0
    # Loop through all meetingsw
    while s_ptr < len(intervals):
        if starts[s_ptr] < ends[e_ptr]:
            used_rooms += 1
            s_ptr += 1
        else:
            used_rooms -= 1
            e_ptr += 1
        max_rooms = max(max_rooms, used_rooms)
    return max_rooms
meetings = [(0, 30), (5, 10), (15, 20)]
print(f"Minimum rooms required: {min_meeting_rooms(meetings)}")