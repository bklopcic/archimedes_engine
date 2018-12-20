const Messager = {
    messages: [
        {x: 0, y: 0, text:"What's an actor?"},
        {x: -100, y: -100, text:"What do actors do?"},
        {x: 50, y: 70, text:"Those actors are boring."},
    ],

    currIdx: 0,

    getMessage: function()
    {
        if (this.currIdx >= this.messages.length) return {x:0, y:0, text:""};
        const msg = this.messages[this.currIdx];
        this.currIdx++;
        return msg;
    }
}