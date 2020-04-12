const Handler = require('./Handler.js');

class ModHandler extends Handler{
    constructor(message){
        super(message);
        // this.valid_actions = {'add': this.add, 'remove': this.remove, 'edit': this.edit};
        this.valid_actions['add'] = this.add;
        this.valid_actions['remove'] = this.remove;
        this.valid_actions['edit'] = this.edit;

        this.name = 'mod';
        this.role = this.getModRole();
    }

    // TODO: what to do if a mod role doesn't exist yet
    getModRole(){
        var roles = this.guild.roles.cache;
        for (const id of roles.keys()) {
            var r = roles.get(id);
            if (r.name === this.name){
                return r;
            }
        }
        return null;
    }

    getMember(mention){
        var id = this.getIDFromMention(mention);
        if (id){
            var member = this.guild.members.cache.get(id);
            if (member){
                return member;
            }
        }
        return false;
    }

    async add(mention) {
        var member = this.getMember(mention);

        if (member) {
            let promise = member.roles.add(this.role)
                .then(
                    function (m) {return `Added ${mention} as a mod`;},
                    function(e){return `Unspecified error:\n${e}`;}
                );
            return await promise;
        }
        else {
            return `Invalid user: ${mention}`;
        }
    };

    async remove(mention){
        var member = this.getMember(mention);

        if (member) {
            let promise = member.roles.remove(this.role)
                .then(
                    function (m) {return `Removed ${mention} as a mod`;},
                    function(e){return `Unspecified error:\n${e}`;}
                );
            return await promise;
        }
        else {
            return `Invalid user: ${mention}`;
        }
    };

    edit = function(options){

    }
}

module.exports = ModHandler;