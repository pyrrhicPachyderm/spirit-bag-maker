var bagTemplate = `
{
  "SaveName": "",
  "Date": "",
  "VersionNumber": "",
  "GameMode": "",
  "GameType": "",
  "GameComplexity": "",
  "Tags": [],
  "Gravity": 0.5,
  "PlayArea": 0.5,
  "Table": "",
  "Sky": "",
  "Note": "",
  "TabStates": {},
  "LuaScript": "",
  "LuaScriptState": "",
  "XmlUI": "",
  "ObjectStates": [
    {
      "GUID": "PLACEHOLDER",
      "Name": "Custom_Model_Bag",
      "Transform": {
        "posX": 0.0,
        "posY": 0.0,
        "posZ": 0.0,
        "rotX": 0.0,
        "rotY": 180.0,
        "rotZ": 0.0,
        "scaleX": 5.46,
        "scaleY": 1.0,
        "scaleZ": 5.46
      },
      "Nickname": "PLACEHOLDER",
      "Description": "Custom",
      "GMNotes": "",
      "AltLookAngle": {
        "x": 0.0,
        "y": 0.0,
        "z": 0.0
      },
      "ColorDiffuse": {
        "r": 0.568599939,
        "g": 0.5608,
        "b": 0.5608,
        "a": 0.0
      },
      "Tags": [
        "Custom",
        "Spirit"
      ],
      "LayoutGroupSortIndex": 0,
      "Value": 0,
      "Locked": false,
      "Grid": false,
      "Snap": false,
      "IgnoreFoW": false,
      "MeasureMovement": false,
      "DragSelectable": true,
      "Autoraise": true,
      "Sticky": true,
      "Tooltip": true,
      "GridProjection": false,
      "HideWhenFaceDown": false,
      "Hands": false,
      "MaterialIndex": -1,
      "MeshIndex": -1,
      "Number": 0,
      "CustomMesh": {
        "MeshURL": "http://cloud-3.steamusercontent.com/ugc/1847038070178749845/F9B69FD810B4A07F92D525124179BDDABADB884E/",
        "DiffuseURL": "",
        "NormalURL": "",
        "ColliderURL": "",
        "Convex": true,
        "MaterialIndex": 3,
        "TypeIndex": 6,
        "CustomShader": {
          "SpecularColor": {
            "r": 1.0,
            "g": 1.0,
            "b": 1.0
          },
          "SpecularIntensity": 0.0,
          "SpecularSharpness": 2.0,
          "FresnelStrength": 0.0
        },
        "CastShadows": true
      },
      "Bag": {
        "Order": 0
      },
      "LuaScript": "",
      "LuaScriptState": "",
      "XmlUI": "",
      "ChildObjects": [
        {
          "GUID": "PLACEHOLDER",
          "Name": "Custom_Tile",
          "Transform": {
            "posX": 0.0,
            "posY": 0.2,
            "posZ": 0.0,
            "rotX": 0.0,
            "rotY": 0.0,
            "rotZ": 180.0,
            "scaleX": 1.0,
            "scaleY": 1.0,
            "scaleZ": 1.0
          },
          "Nickname": "",
          "Description": "",
          "GMNotes": "",
          "AltLookAngle": {
            "x": 0.0,
            "y": 0.0,
            "z": 0.0
          },
          "ColorDiffuse": {
            "r": 1.0,
            "g": 1.0,
            "b": 1.0
          },
          "LayoutGroupSortIndex": 0,
          "Value": 0,
          "Locked": false,
          "Grid": false,
          "Snap": false,
          "IgnoreFoW": false,
          "MeasureMovement": false,
          "DragSelectable": true,
          "Autoraise": true,
          "Sticky": false,
          "Tooltip": true,
          "GridProjection": false,
          "HideWhenFaceDown": false,
          "Hands": false,
          "CustomImage": {
            "ImageURL": "PLACEHOLDER",
            "ImageSecondaryURL": "PLACEHOLDER",
            "ImageScalar": 1.0,
            "WidthScale": 0.0,
            "CustomTile": {
              "Type": 0,
              "Thickness": 0.2,
              "Stackable": false,
              "Stretch": true
            }
          },
          "LuaScript": "",
          "LuaScriptState": "",
          "XmlUI": ""
        }
      ]
    }
  ]
}
`;

//Generates a random GUID.
function generateGUID() {
	//We want 6 random hex digits, so a 24 bit integer.
	return Math.floor(Math.random() * (1 << 24)).toString(16);
}

//Uses the input files to generate the full JSON text.
function getJSON() {
	var json = JSON.parse(bagTemplate);
	var bag = json["ObjectStates"][0];
	var panel = bag["ChildObjects"][0];
	
	var spiritName = document.getElementById("spiritName").value;
	var frontURL = document.getElementById("frontURL").value;
	var backURL = document.getElementById("backURL").value;
	var complexity = document.getElementById("complexity").value;
	var requiresTokens = document.getElementById("requiresTokens").checked;
	var requiresBadlands = document.getElementById("requiresBadlands").checked;
	
	bag["GUID"] = generateGUID();
	bag["Nickname"] = spiritName;
	panel["GUID"] = generateGUID();
	panel["CustomImage"]["ImageURL"] = frontURL;
	panel["CustomImage"]["ImageSecondaryURL"] = backURL;
	
	if(complexity != "") bag["Tags"].push(complexity);
	if(requiresTokens) bag["Tags"].push("Requires Tokens");
	if(requiresBadlands) bag["Tags"].push("Requires Badlands");
	
	return JSON.stringify(json, null, 2); //Indent with 2 spaces.
}

//A function to save the image, called by the HTML button.
function downloadJSON() {
	var fileName = `${document.getElementById("spiritName").value} Bag.json`;
	var fileContents = getJSON();
	var file = new Blob([fileContents], {type: 'application/json'});
	
	var link = document.createElement('a');
	link.setAttribute('download', fileName);
	link.setAttribute('href', window.URL.createObjectURL(file));
	link.click();
	link.remove();
}
