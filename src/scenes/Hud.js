export default class Hud {
    constructor(scene) {
        this.scene = scene;

        this.content = {
            player_health: this.scene.add.text(5, 5, 'HEALTH:')
        }
        
        this.content.player_health.setScrollFactor(0, 0);
    }

    update() {
        const hearts = '❤'.repeat(this.scene.player.health);
        this.content.player_health.setText(`HEALTH: ${hearts}`);
    }
}
