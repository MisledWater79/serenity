import {
  AbilityIndex,
  ActorDamageCause,
  AnimatePacket,
  Vector3f,
  AnimateId,
  Gamemode
} from "@serenityjs/protocol";

import { EntityIdentifier } from "../../../enums";
import { ItemWeaponTrait } from "../../../item";
import { PlayerCombatComponent } from "../../../types";
import { Entity } from "../../entity";
import { EntityHealthTrait } from "../attribute";

import { PlayerTrait } from "./trait";

class PlayerCombatTrait extends PlayerTrait {
  public static readonly identifier = "combat";
  public static readonly types = [EntityIdentifier.Player];

  /**
   * The combat component data for the player.
   */
  public get component(): PlayerCombatComponent {
    return this.player.getComponent(
      PlayerCombatTrait.identifier
    ) as PlayerCombatComponent;
  }

  /**
   * The maximum reach of the player horizontally.
   */
  public get horizontalMaxReach(): number {
    return this.component.horizontalMaxReach;
  }

  /**
   * The maximum reach of the player horizontally.
   */
  public set horizontalMaxReach(value: number) {
    this.component.horizontalMaxReach = value;
  }

  /**
   * The maximum reach of the player vertically.
   */
  public get verticalMaxReach(): number {
    return this.component.verticalMaxReach;
  }

  /**
   * The maximum reach of the player vertically.
   */
  public set verticalMaxReach(value: number) {
    this.component.verticalMaxReach = value;
  }

  /**
   * The horizontal knockback of the player.
   */
  public get horizontalKnockback(): number {
    return this.component.horizontalKnockback;
  }

  /**
   * The horizontal knockback of the player.
   */
  public set horizontalKnockback(value: number) {
    this.component.horizontalKnockback = value;
  }

  /**
   * The vertical knockback of the player.
   */
  public get verticalKnockback(): number {
    return this.component.verticalKnockback;
  }

  /**
   * The vertical knockback of the player.
   */
  public set verticalKnockback(value: number) {
    this.component.verticalKnockback = value;
  }

  /**
   * The amount of ticks till the player can attack again.
   */
  public get combatCooldown(): number {
    return this.component.combatCooldown;
  }

  /**
   * The amount of ticks till the player can attack again.
   */
  public set combatCooldown(value: number) {
    this.component.combatCooldown = value;
  }

  /**
   * Whether the player is on cooldown.
   */
  public isOnCooldown: boolean = false;

  /**
   * Whether the player is on critical cooldown.
   */
  public isOnCriticalCooldown: boolean = false;

  public onAdd(): void {
    // Check if the player has a combat component.
    if (this.player.hasComponent(PlayerCombatTrait.identifier)) return;

    // Create a new combat component.
    this.player.addComponent<PlayerCombatComponent>(
      PlayerCombatTrait.identifier,
      {
        horizontalMaxReach: 3,
        verticalMaxReach: 3,
        horizontalKnockback: 0.4,
        verticalKnockback: 0.4,
        combatCooldown: 5
      }
    );
  }

  public onRemove(): void {
    // Remove the combat component from the player.
    this.player.removeComponent(PlayerCombatTrait.identifier);
  }

  public onAttackEntity(target: Entity): void {
    // Check if the player is in reach of the target, and if the player is on cooldown.
    if (this.isOnCooldown || !this.isInReachOf(target)) return;

    // Check if the target has a health trait.
    if (!target.hasTrait(EntityHealthTrait)) return;

    // Check if the target is a player, and if the player is allowed to attack players.
    if (
      target.isPlayer() &&
      !this.player.abilities.get(AbilityIndex.AttackPlayers)
    )
      return;

    // Check if the target is not a player, and if the player is allowed to attack mobs.
    if (
      !target.isPlayer() &&
      !this.player.abilities.get(AbilityIndex.AttackMobs)
    )
      return;

    // Check if the target is a player, and if the target is in creative or spectator mode.
    if (
      target.isPlayer() &&
      (target.gamemode === Gamemode.Creative ||
        target.gamemode === Gamemode.Spectator)
    )
      return;

    // Get the health trait of the target.
    const health = target.getTrait(EntityHealthTrait);

    // We want to apply knock back to the entity when it is attacked, based on the direction the player is facing.
    // Get the direction the player is facing
    const { headYaw, pitch } = this.player.rotation;

    // Normalize the pitch & headYaw, so the entity will be spawned in the correct direction
    const headYawRad = (headYaw * Math.PI) / 180;
    const pitchRad = (pitch * Math.PI) / 180;

    // Calculate the horizontal knockback in the x direction
    const x =
      -Math.sin(headYawRad) *
      Math.cos(pitchRad) *
      this.getCalculatedHorizontalKnockback() *
      0.7;

    // Calculate the vertical knockback
    const y = this.getCalculatedVerticalKnockback();

    // Calculate the horizontal knockback in the z direction
    const z =
      Math.cos(headYawRad) *
      Math.cos(pitchRad) *
      this.getCalculatedHorizontalKnockback() *
      0.7;

    // Set the velocity of the entity
    target.addMotion(new Vector3f(x, y, z));

    // Check if the player is critical attacking the entity.
    const critical =
      !this.isOnCriticalCooldown &&
      this.player.isSprinting &&
      !this.player.onGround;

    // Get the calculated damage of the player.
    const damage = this.getCalculatedDamage(critical);

    // Check if the player is critical attacking the entity.
    if (critical) {
      // Create a new animate packet for the critical hit.
      const packet = new AnimatePacket();

      // Set the properties of the animate packet.
      packet.id = AnimateId.CriticalHit;
      packet.runtimeEntityId = target.runtimeId;
      packet.boatRowingTime = null;

      // Broadcast the animate packet to the dimension of the player.
      this.player.dimension.broadcast(packet);

      // Start the critical cooldown
      this.startCriticalCooldown();
    }

    // Apply damage to the entity
    health.applyDamage(damage, this.player, ActorDamageCause.EntityAttack);

    // Start the combat cooldown
    return this.startCooldown();
  }

  /**
   * Checks whether the entity is in reach of the player.
   * @param entity The entity to check if it is in reach of the player.
   * @returns Whether the entity is in reach of the player.
   */
  public isInReachOf(entity: Entity): boolean {
    // Get the distance between the player and the entity.
    const dx = this.player.position.x - entity.position.x;
    const dy = this.player.position.y - entity.position.y;
    const dz = this.player.position.z - entity.position.z;

    // Get the maximum reach of the player.
    if (Math.abs(dx) > this.horizontalMaxReach) return false;
    if (Math.abs(dy) > this.verticalMaxReach) return false;
    if (Math.abs(dz) > this.horizontalMaxReach) return false;

    // Return whether the entity is in reach of the player.
    return true;
  }

  /**
   * Gets the calculated horizontal knockback of the player based on the held item enchantments.
   * @returns The calculated horizontal knockback.
   */
  public getCalculatedHorizontalKnockback(): number {
    // Get the held item of the player.
    const item = this.player.getHeldItem();

    // Check if the item is not defined.
    if (!item) return this.horizontalKnockback;

    // Check if the item has a weapon trait.
    if (!item.hasTrait(ItemWeaponTrait)) return this.horizontalKnockback;

    // Get the weapon trait of the item.
    const weapon = item.getTrait(ItemWeaponTrait);

    // Return the calculated horizontal reach.
    return this.horizontalKnockback + weapon.getCalculatedKnockback();
  }

  /**
   * Gets the calculated vertical knockback of the player based on the held item enchantments.
   * @returns The calculated vertical knockback.
   */
  public getCalculatedVerticalKnockback(): number {
    return this.verticalKnockback;
  }

  /**
   * Gets the calculated damage of the player based on the held item enchantments.
   * @param critical Whether the damage is critical.
   * @returns The calculated damage.
   */
  public getCalculatedDamage(critical = false): number {
    // Get the held item of the player.
    const item = this.player.getHeldItem();

    // Check if the item is not defined.
    if (!item) return 1;

    // Check if the item has a weapon trait.
    if (!item.hasTrait(ItemWeaponTrait)) return 1;

    // Get the weapon trait of the item.
    const weapon = item.getTrait(ItemWeaponTrait);

    // Return the calculated damage.
    return critical
      ? weapon.getCalculatedCriticalDamage()
      : weapon.getCalculatedBaseDamage();
  }

  /**
   * Starts the combat cooldown of the player.
   * @param ticks The amount of ticks to cooldown the player; if not provided, the default combat cooldown will be used.
   */
  public startCooldown(ticks?: number): void {
    // Set the player on cooldown.
    this.isOnCooldown = true;

    // Schedule the combat cooldown
    this.player.world
      // Schedule the combat cooldown based on the provided ticks or the default combat cooldown.
      .schedule(ticks ?? this.combatCooldown)
      .on(() => (this.isOnCooldown = false)); // Set the player off cooldown.
  }

  /**
   * Starts the critical combat cooldown of the player.
   * @param ticks The amount of ticks to cooldown the player; if not provided, the default combat cooldown will be used multiplied by 5.
   */
  public startCriticalCooldown(ticks?: number): void {
    // Set the player on cooldown.
    this.isOnCriticalCooldown = true;

    // Schedule the combat cooldown
    this.player.world
      // Schedule the combat cooldown based on the provided ticks or the default combat cooldown.
      .schedule(ticks ?? this.combatCooldown * 5)
      .on(() => (this.isOnCriticalCooldown = false)); // Set the player off cooldown.
  }
}

export { PlayerCombatTrait };
