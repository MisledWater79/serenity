import { Proto, Serialize } from "@serenityjs/raknet";
import { Byte, VarInt, VarString, ZigZong } from "@serenityjs/binarystream";

import { Packet } from "../../enums";
import { EmoteFlags } from "../../enums/emote-flag";

import { DataPacket } from "./data-packet";

@Proto(Packet.Emote)
class EmotePacket extends DataPacket {
	@Serialize(ZigZong) public actorRuntimeId!: bigint;
	@Serialize(VarString) public emoteId!: string;
	@Serialize(VarInt) public tickLength!: number;
	@Serialize(VarString) public xuid!: string;
	@Serialize(VarString) public platformChatId!: string;
	@Serialize(Byte) public flags!: EmoteFlags;
}

export { EmotePacket };
