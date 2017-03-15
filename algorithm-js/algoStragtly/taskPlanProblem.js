var tasks = [{
	start: 1,
	end: 13
}, {
	start: 2,
	end: 4
}, {
	start: 4,
	end: 7
}, {
	start: 6,
	end: 8
}, {
	start: 8,
	end: 11
}, {
	start: 12,
	end: 14
}];

function taskPlanSolv(tasks) {
	var curEnd = 0,
		result = [];
	tasks = sortTaskByEndTime(tasks);
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].start > curEnd) {
			curEnd = tasks[i].end;
			result.push(tasks[i]);
		}
	}
	return result;
}

function sortTaskByEndTime(tasks) {
	return tasks.sort(function(a, b) {
		return a.end > b.end;
	});
}

console.log(taskPlanSolv(tasks));
