const LocalEvent = function(item){          // 定义一个本地存储的构造函数
    this.get = function () {                // 存数据
        return JSON.parse(localStorage.getItem(item)) || [];
    }
    this.set = function (obj) {             // 拿数据
        localStorage.setItem(item,JSON.stringify(obj));
    }
    this.clear = function () {              // 删数据
        localStorage.removeItem(item);
    }
}
const local = new LocalEvent('knight'); // 创建一个本地存储的事例
const state = {
    event: local.get()
}
const mutations = {
    ADDEVENT(states,obj){                   // ADDEVENT，添加新的事件，并存储到localStorage里
        states.event.unshift(obj.items);
        local.set(states.event);
    }
}
