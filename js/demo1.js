var nodes = [
    { x: 200, y: 200, ip: '192.166.22.100' },
    { x: 400, y: 200, ip: '192.166.22.101' },
    { x: 300, y: 400, ip: '192.166.22.102' },
];

var links = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 2 },
];

var width = 900,
    height = 600;

// 定义一个力导向图对象
var force = d3.forceSimulation()
    // 设置重心使不位置不会偏移，通常是外边框的中心
    .force("center", d3.forceCenter(width / 2, height / 2));

// 设置svg对象并设置宽高
var svg = d3.select(document.getElementById("d3Topo"))
    .append('svg')
    .attr("width", width)
    .attr("height", height);

// 在svg中添加g元素
var g = svg.append('g');

// 定义对象，此时link和node还未绘制
var link = g.selectAll(".link"),
    node = g.selectAll(".node");

// 指定nodes
force.nodes(nodes);

// 设置连线作用力，并指定links
// strength设置连线作用力的大小，如果不设置为0，
// 连线之间的作用力会将拉扯节点使我们设置的节点位置发生偏移
force.force("link", d3.forceLink(links).strength(0));

// 根据数据绘制添加节点(圆形)，并设置一些固定属性
node = node.data(nodes)
    .enter().append('circle')
    .attr('r', 20);

// 根据数据绘制添加连线，并设置一些固定属性
link = link.data(links)
    .enter().append("line")
    .attr('stroke', '#000');

// 因为本质上是个力仿真图，所以节点连线等都存在着力的作用，然后做姿态布局调整
// 初始化以及改变节点位置时触发该事件
// 节点或连线的一些动态属性可以在此处设置（比如位置）
force.on("tick", function () {
    link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });
    node.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
});