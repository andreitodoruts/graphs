(function main() {
    
    function Node(value) 
    {
        this.value = value;
        this.edges = [];
        this.parent = null;
        this.searched = null;
    }
    
    Node.prototype.addEdge = function(node) 
    {
        this.edges.push(node);
    }
    
    function Graph()
    {
        this.nodes = [];
        this.graph = {};
        
        this.current = null;
        this.start = null;
        this.end = null;
        
        this.queue = [];
        
        this.path = '';
        
    }
    
    Graph.prototype.enqueue = function(node) 
    {
        this.queue.push(node);
    }
    
    Graph.prototype.dequeue = function() 
    {
        return this.queue.shift();
    }
    
    Graph.prototype.setStart = function(start) 
    {
        this.start = start;
        this.current = start;
        return this.start;
    }
    
    Graph.prototype.setEnd = function(end) 
    {
        this.end = end;
        return this.end;
    }
    
    Graph.prototype.createPath = function()
    {
        var node = this.breadthFirstSearch();
        this.current = node;
        
        var pathArr = [];
        
        while(this.current != undefined) {
            
            pathArr.push(this.current.value);
            this.current = this.current.parent;
            
        }
        
        return pathArr;
        
    }
    
    Graph.prototype.getPath = function(order)
    {
        var order = (order == undefined) ? 'DESC' : order;
        var path = this.createPath();
        
        if(order == 'ASC') {
            path.reverse();
        }
        
        this.path = path.join('->');
        
        return this.path;
    }
    
    Graph.prototype.createGraph = function(data) 
    {
        for(var i = 0; i < data.length; i++) {
            var node = new Node(i+1);
            this.nodes.push(node);
            this.graph[i] = node;
            
        }
        
        for(var i = 0; i < this.nodes.length; i++) {
            
            var node = this.nodes[i];
            
            for(var j = 0; j < data[i].length; j++) {
                if(data[i][j] == 1) {
                    node.addEdge(this.nodes[j]);
                }
            }
        }
        
    }
    
    Graph.prototype.breadthFirstSearch = function() 
    {
        if(this.current == this.end){
            return true;
        }
        
        for(var i = 0; i < this.nodes.length; i++){
        
            var edges = this.nodes[i].edges;
            
            for(var j = 0; j < edges.length; j++) {
                
                var edge = edges[j];
                if(i >= this.start.value-1) {
                    edge.parent = this.nodes[i];
                }
                
                if(this.current != edge) {
                    this.enqueue(edge);
                }
                
            }
            
        }        
        
        while(this.queue.length > 0){
            this.current = this.dequeue();
            
            if(this.current == this.end) {
                return this.current;
            }
            
        }
    
    }
    
    
    // Data
    var ways = [
        [0,1,1,0,0,0],
        [0,0,1,0,0,0],
        [0,0,0,1,1,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,1],
        [0,0,0,0,0,0]
    ];
    
    var _g = new Graph();
    _g.createGraph(ways);
    _g.setStart(_g.nodes[0]);
    _g.setEnd(_g.nodes[5]);
    
    console.log(_g.getPath('ASC'));

}());