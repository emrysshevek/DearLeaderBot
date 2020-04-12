class Handler{

    valid_actions = {};

    constructor(guild){
        this.guild = guild;
    }

    async execute(action, options){
        if (!(action in this.valid_actions)){
            return `Invalid action: ${action}. Action must be one of ${this.valid_actions}`;
        }

        var response;
        switch (action) {
            case 'add':
                response = this.add(options);
                break;
            case 'remove':
                response = this.remove(options);
                break;
            case 'edit':
                response = this.edit(options);
                break;
            case 'vote':
                response = this.vote(options);
                break;
            case 'ban':
                response = this.ban(options);
                break;
            case 'kick':
                response = this.kick(options);
                break;
            case 'invite':
                response = this.invite(options);
                break;
            case 'create':
                response = this.create(options);
                break;
            case 'delete':
                response = this.delete(options);
                break;
            case 'move':
                response = this.move(options);
                break;
            default:
                return `No function implemented for action: ${action}`;
        }
        return await response
    }

    async add(options){}
    async remove(options){}
    async edit(options){}
    async create(options){}
    async delete(options){}
    async vote(options){}
    async move(options){}
    async ban(options){}
    async kick(options){}
    async invite(options){}

    getIDFromMention(mention) {
        if (!mention) return false;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            var id = mention.slice(2, -1);

            if (id.startsWith('!') || id.startsWith('#') || id.startsWith('&')) {
                id = id.slice(1);
            }

            return id;
        }
        else {
            return false;
        }
    }

}

module.exports = Handler;