import { VarString, Uint16, Endianness, Bool } from "@serenityjs/binarystream";
import { Proto, Serialize } from "@serenityjs/raknet";

import { Packet } from "../../enums";

import { DataPacket } from "./data-packet";

@Proto(Packet.Transfer)
class TransferPacket extends DataPacket {
	@Serialize(VarString) public address!: string;
	@Serialize(Uint16, Endianness.Little) public port!: number;
	@Serialize(Bool) public reloadWorld!: boolean;
}

export { TransferPacket };
