function sortByTime(items) {
    var formatted = [];
    for (var i = 0; i < items.length; ++i) {
        let item = items[i];
        item.data.created = new Date(parseInt(item.data.created) * 1000);
        formatted.push(item);
    }
    var thesorted = formatted.sort(function (x, y) {
        return y.data.created - x.data.created;
    });
    return thesorted;
}

export default sortByTime;