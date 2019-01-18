/**
 * @enum LOCAL - Local storage type
 * @enum CLOUD - Cloud storage type
 * @enum OTHER - Any other storage type
 */
export var StorageType;
(function (StorageType) {
    StorageType["Local"] = "local";
    StorageType["Cloud"] = "cloud";
    StorageType["Other"] = "other";
})(StorageType || (StorageType = {}));
/**
 * @name - Asset Type
 * @description - Defines the type of asset within a project
 * @member Image - Specifies an asset as an image
 * @member Video - Specifies an asset as a video
 */
export var AssetType;
(function (AssetType) {
    AssetType[AssetType["Unknown"] = 0] = "Unknown";
    AssetType[AssetType["Image"] = 1] = "Image";
    AssetType[AssetType["Video"] = 2] = "Video";
})(AssetType || (AssetType = {}));
/**
 * @name - Asset State
 * @description - Defines the state of the asset with regard to the tagging process
 * @member NotVisited - Specifies as asset that has not yet been visited or tagged
 * @member Visited - Specifies an asset has been visited, but not yet tagged
 * @member Tagged - Specifies an asset has been visited and tagged
 */
export var AssetState;
(function (AssetState) {
    AssetState[AssetState["NotVisited"] = 0] = "NotVisited";
    AssetState[AssetState["Visited"] = 1] = "Visited";
    AssetState[AssetState["Tagged"] = 2] = "Tagged";
})(AssetState || (AssetState = {}));
/**
 * @name - Region Type
 * @description - Defines the region type within the asset metadata
 * @member Square - Specifies a region as a square
 * @member Rectangle - Specifies a region as a rectangle
 * @member Polygon - Specifies a region as a multi-point polygon
 */
export var RegionType;
(function (RegionType) {
    RegionType["Square"] = "SQUARE";
    RegionType["Rectangle"] = "RECTANGLE";
    RegionType["Polygon"] = "POLYGON";
})(RegionType || (RegionType = {}));
//# sourceMappingURL=models.js.map