import { Int8, VarLong } from "@serenityjs/binarystream";
import { Proto, Serialize } from "@serenityjs/raknet";

import { Packet, ContainerId, ContainerType } from "../../enums";
import { BlockPosition } from "../types";

import { DataPacket } from "./data-packet";

@Proto(Packet.ContainerOpen)
class ContainerOpenPacket extends DataPacket {
	@Serialize(Int8) public identifier!: ContainerId;
	@Serialize(Int8) public type!: ContainerType;
	@Serialize(BlockPosition) public position!: BlockPosition;
	@Serialize(VarLong) public uniqueId!: bigint;
}

export { ContainerOpenPacket };
