// script.name=ColorToTerrain - ctRy
// script.description=Converts RGB images to minecraft blocks

// path/to/image/file.png.jpg.etc
// terrain r g b (0 - 255)
// repeat

//tip to quickly get rgb values of blocks:
//go to github.com/Captain-Chaos/WorldPainter/blob/master/WorldPainter/WPCore/src/main/resources/org/pepsoft/worldpainter/colourschemes/default.txt
//first number (one at left) is the block id and data value
//2nd 3rd 4th are r g b when block is bright.

var xDefault = dimension.getExtent().getX() * 128;
var yDefault = dimension.getExtent().getY() * 128;

/* Default List:
BareGrass 69 110 51
Dirt 134 96 67
Podzol 90 63 28
Sand 219 211 160
RedSand 169 88 33
HardenedClay 150 92 66
WhiteClay 209 178 161
OrangeClay 161 83 37
MagentaClay 149 88 108
LightBlueClay 113 108 137
YellowClay 186 133 35
LimeClay 103 117 52
PinkClay 161 78 78
GreyClay 57 42 35
LightGreyClay 135 106 97
CyanClay 86 91 91
PurpleClay 118 70 86
BlueClay 74 59 91
BrownClay 77 51 35
GreenClay 76 83 42
RedClay 143 61 46
BlackClay 37 22 16
Sandstone 218 210 158
Stone 125 125 125
Rock 123 123 123
Cobblestone 122 122 122
MossyCobblestone 103 121 103
Obsidian 20 18 29
Bedrock 83 83 83
Gravel 126 124 122
Clay 158 164 176
Water 47 67 244
Lava 216 104 26
DeepSnow 239 251 251
Netherrack 111 54 52
SoulSand 84 64 51
Mycelium 111 99 105
EndStone 221 223 165
RedSandstone 166 85 29
Granite 153 113 98
Diorite 179 179 182
Andesite 130 131 131
GrassPath 159 114 98
*/

///////////CODE/////////////

if (parseInt(org.pepsoft.worldpainter.Version.BUILD) > 20160820173357)
	print("This WorldPainter version probably includes CaptainChaos's new scripting system. Ask ctRy to update his scripts!");

print("Script by ctRy");

var terrainArr = ["Grass", "BareGrass", "Dirt", "Permadirt", "Podzol", "Sand", "RedSand", "Desert", "RedDesert", "Mesa", "HardenedClay", "WhiteClay", "OrangeClay", "MagentaClay", "LightBlueClay", "YellowClay", "LimeClay", "PinkClay", "GreyClay", "LightGreyClay", "CyanClay", "PurpleClay", "BlueClay", "BrownClay", "GreenClay", "RedClay", "BlackClay", "Sandstone", "Stone", "Rock", "Cobblestone", "MossyCobblestone", "Obsidian", "Bedrock", "Gravel", "Clay", "Beaches", "Water", "Lava", "StoneSnow", "DeepSnow", "Netherrack", "SoulSand", "Netherlike", "Mycelium", "EndStone", "Resources", "Custom1", "Custom2", "Custom3", "Custom4", "Custom5", "Custom6", "Custom7", "Custom8", "Custom9", "Custom10", "Custom11", "Custom12", "Custom13", "Custom14", "Custom15", "Custom16", "Custom17", "Custom18", "Custom19", "Custom20", "Custom21", "Custom22", "Custom23", "Custom24", "RedSandstone", "Granite", "Diorite", "Andesite", "StoneMix", "Custom25", "Custom26", "Custom27", "Custom28", "Custom29", "Custom30", "Custom31", "Custom32", "Custom33", "Custom34", "Custom35", "Custom36", "Custom37", "Custom38", "Custom39", "Custom40", "Custom41", "Custom42", "Custom43", "Custom44", "Custom45", "Custom46", "Custom47", "Custom48", "GrassPath", "Magma", "Custom49", "Custom50", "Custom51", "Custom52", "Custom53", "Custom54", "Custom55", "Custom56", "Custom57", "Custom58", "Custom59", "Custom60", "Custom61", "Custom62", "Custom63", "Custom64", "Custom65", "Custom66", "Custom67", "Custom68", "Custom69", "Custom70", "Custom71", "Custom72", "Custom73", "Custom74", "Custom75", "Custom76", "Custom77", "Custom78", "Custom79", "Custom80", "Custom81", "Custom82", "Custom83", "Custom84", "Custom85", "Custom86", "Custom87", "Custom88", "Custom89", "Custom90", "Custom91", "Custom92", "Custom93", "Custom94", "Custom95", "Custom96"];

var palette = [];

if (arguments[0] == "list")
{
	for (var i = 0; i < terrainArr.length; i++)
	{
		print(pad(i) + " = " + terrainArr[i]);
	}

	print("\nYou can type either the terrain index or the CaSE SenSiTIVe terrain name\n");
}
else
{
	if (arguments[0] == "")
	    throw "Argument 0 = path/to/image/file.png.jpg.etc, Argument 1 and more = terrain r g b (0 - 255)\nOr type list for available terrain types\nYou can put default for Argument 1 to include preset blocks\n";
	
	//default
	if (arguments.length < 2 || arguments[1] == "" || arguments[1] == "default")
	{
		print("\nUsing default palette");

		var def = "BareGrass 69 110 51\nDirt 134 96 67\nPodzol 90 63 28\nSand 219 211 160\nRedSand 169 88 33\nHardenedClay 150 92 66\nWhiteClay 209 178 161\nOrangeClay 161 83 37\nMagentaClay 149 88 108\nLightBlueClay 113 108 137\nYellowClay 186 133 35\nLimeClay 103 117 52\nPinkClay 161 78 78\nGreyClay 57 42 35\nLightGreyClay 135 106 97\nCyanClay 86 91 91\nPurpleClay 118 70 86\nBlueClay 74 59 91\nBrownClay 77 51 35\nGreenClay 76 83 42\nRedClay 143 61 46\nBlackClay 37 22 16\nSandstone 218 210 158\nStone 125 125 125\nRock 123 123 123\nCobblestone 122 122 122\nMossyCobblestone 103 121 103\nObsidian 20 18 29\nBedrock 83 83 83\nGravel 126 124 122\nClay 158 164 176\nWater 47 67 244\nLava 216 104 26\nDeepSnow 239 251 251\nNetherrack 111 54 52\nSoulSand 84 64 51\nMycelium 111 99 105\nEndStone 221 223 165\nRedSandstone 166 85 29\nGranite 153 113 98\nDiorite 179 179 182\nAndesite 130 131 131\nGrassPath 159 114 98".split("\n");
		
		for (var i = 0; i < def.length; i++)
		{
			var val = def[i].split(" ");
			palette.push({t:terrainArr.indexOf(val[0]), r:parseInt(val[1]), g:parseInt(val[2]), b:parseInt(val[3])});
		}
		
	}
	else
	{
		var val = arguments[1].split(" ");

		if (val.length != 4)
		{
			throw "Error in argument " + 1 + ": Expected terrain r g b\n";
		}

		var terrain;
		if (isNaN(parseInt(val[0])))
			terrain = terrainArr.indexOf(val[0]);
		else
			terrain = parseInt(val[0]);

		palette.push({t:terrain, r:parseInt(val[1]), g:parseInt(val[2]), b:parseInt(val[3])});
	}

	var colorMap = wp.getHeightMap().fromFile(arguments[0]).go();
	var mask = colorMap;

	if (arguments.length > 2)
	{
		for (var i = 2; i < arguments.length; i++)
		{
			if (arguments[i] == "")
				break;

			if (arguments[i].indexOf("mask: ") == 0)
			{
				mask = wp.getHeightMap().fromFile(arguments[i].substring(6).trim()).go();
				
				print("\nMask detected");
				print(arguments[i].substring(6).trim());
				continue;
			}

			var val = arguments[i].split(" ");
			if (val.length != 4)
			{
				throw "Error in argument " + i + ": Expected terrain r g b\n";
			}
			var terrain;
			if (isNaN(parseInt(val[0])))
				terrain = terrainArr.indexOf(val[0]);
			else
				terrain = parseInt(val[0]);

			palette.push({t:terrain, r:parseInt(val[1]), g:parseInt(val[2]), b:parseInt(val[3])});
		}
	}

	print("\nPalette:");
	for (var i = 0; i < palette.length; i++)
	{
		print(terrainArr[palette[i].t]);
	}
	
	var extent = colorMap.getExtent();
	print("\nImage's upper left pixel will be placed in the coordinate (x: " + xDefault + ", y: " + yDefault + ").");
	print("Tiles that are empty will remain empty.");

	print("\nNow processing . . .");

	for (var x = extent.getX(); x < extent.getWidth(); x++)
	{
		for (var y = extent.getY(); y < extent.getHeight(); y++)
		{
			if (!dimension.isTilePresent(truncate((x + xDefault) / 128.0), truncate((y + yDefault) / 128.0) ))
				continue;

			if (mask !== colorMap && mask.getHeight(x, y) < 128)
				continue;

			var color = new java.awt.Color(colorMap.getColour(x, y), java.lang.Boolean.TRUE);

			if (color.getAlpha() < 128)
				continue;

			var distance = 999999;
			var index = -1;
			for (var i = 0; i < palette.length; i++)
			{
				tempDistance = distanceBetween(color.getRed(), color.getGreen(), color.getBlue(), palette[i].r, palette[i].g, palette[i].b);
				if (tempDistance < distance)
				{
					distance = tempDistance;
					index = i;
				}

				if (distance == 0)
					break;
			}

			dimension.setTerrainAt(x + xDefault, y + yDefault, org.pepsoft.worldpainter.Terrain.VALUES[palette[index].t]);


		}
	}

	print("\nDone! :D");

}

function pad(n)
{
  if (n < 10)
  	return "  " + n;
  else if (n < 100)
  	return " " + n;
  else
  	return "" + n;
}

function truncate(number)
{
	return number > 0 ? Math.floor(number) : Math.ceil(number);
}

//squared distance between two color values TODO: change to better color format
function distanceBetween(r, g, b, rr, gg, bb)
{
	return (rr - r) * (rr - r) + (gg - g) * (gg - g) + (bb - b) * (bb - b);
}