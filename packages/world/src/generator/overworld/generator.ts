import { DimensionType } from "@serenityjs/protocol";
import { Chunk } from "../../chunk";
import { TerrainGenerator } from "../generator";

export class OverworldTestGenerator extends TerrainGenerator {
	public static readonly identifier = "overworld_test";

  public apply(cx: number, cz: number, type: DimensionType): Chunk {
      const chunk = new Chunk(cx, cz, type);
      chunk.ready = false;

      this.handoff(chunk);
      
      return chunk;
  }
}