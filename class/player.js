class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let taked;
        for(let i = 0; i < this.currentRoom.items.length; i++) {
            const item = this.currentRoom.items[i];
            if(item.name === itemName) {
                taked = this.currentRoom.items.splice(i, 1)[0];
                this.items.push(taked);
                return;
            }
        }
    }

    dropItem(itemName) {
        let dropped;
        for(let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if(item.name === itemName) {
                dropped = this.items.splice(i, 1)[0];
                this.currentRoom.items.push(dropped);
                return;
            }
        }
    }

    eatItem(itemName) {
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if(item.name === itemName) {
                if(!(item.isFood)) {
                    console.log("You cannot eat anything that is not food");
                    return;
                } else {
                    this.items.splice(i, 1);
                    console.log('Mmmm, delicious!');
                    return;
                }
            }
        }
    }

    getItemByName(name) {
        for(const item of this.items) {
            if(item.name === name) {
                return item;
            }
        }
        return null;
    }
}

module.exports = {
  Player,
};
