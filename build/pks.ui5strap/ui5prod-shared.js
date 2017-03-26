/*
 * 
 * UI5Prod
 *
 * Shared library for all grunt scripts.
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

module.exports = {
		
	getProdConfig : function(oOptions){
		
		"use strict";
		
		var sProductVersion = oOptions.productVersion,
		sMajorVersion = 1,
		sProductName = oOptions.productName,
		sLibraryName = oOptions.libraryName,
		
		aSubLibraries = oOptions.subLibraries || [],
		
		sReleaseNameFullVersion = sProductName + "-" + sProductVersion,
		sReleaseNameMinVersion = sProductName + "-" + sProductVersion + "-min",
		
		sSuffixDev = "_dev",
		sSuffixAll = "_all",
		sSuffixMin = "_min",
		sSuffixPre = "_pre",
		
		sSubPathWww = "www",
		sSubPathRelease = "release",
		sSubPathWwwDocs = sSubPathWww + "/docs",
		sSubPathWwwLib = sSubPathWww + "/lib",
		
		sSubPathReleaseTarget = "apps/site_pksoftware/pks_store/releases/" + sProductName,
		
		sSubPathLib = sLibraryName.replace(/\./g, "/"),
		sSubPathLibDev = sSubPathLib + sSuffixDev,
		sSubPathLibAll = sSubPathLib + sSuffixAll,
		sSubPathLibMin = sSubPathLib + sSuffixMin,
		sSubPathLibPre = sSubPathLib + sSuffixPre,
		
		sPathToRoot = "../../",
		sPathToLibRoot = sPathToRoot + sSubPathWwwLib + "/",
		sPathToDocsRoot = sPathToRoot + sSubPathWwwDocs + "/",
		sPathToLocalReleaseRoot = sPathToRoot + sSubPathRelease + "/",
		sPathToTargetRoot = sPathToRoot + "../ui5strap-docs/",
		
		sFolderLibDocs = sPathToDocsRoot + sLibraryName + "/",
		sFolderLibDocsApi = sFolderLibDocs + "api/",
		
		sFolderLibDev = sPathToLibRoot + sSubPathLibDev + "/",
		sFolderLibAll = sPathToLibRoot + sSubPathLibAll + "/",
		sFolderLibMin = sPathToLibRoot + sSubPathLibMin + "/",
		sFolderLibPre = sPathToLibRoot + sSubPathLibPre + "/",
		
		sFolderLocalReleaseFullVersion = sPathToLocalReleaseRoot + sReleaseNameFullVersion + "/",
		sFolderLocalReleaseMinVersion = sPathToLocalReleaseRoot + sReleaseNameMinVersion + "/",
		
		sFileLocalReleaseFullVersion = sPathToLocalReleaseRoot + sReleaseNameFullVersion + ".zip",
		sFileLocalReleaseMinVersion = sPathToLocalReleaseRoot + sReleaseNameMinVersion + ".zip",
		
		sFolderReleaseTargetFullVersion = sPathToTargetRoot + sSubPathReleaseTarget + "/" + sMajorVersion + "/" + sProductVersion + "/",
		sFolderReleaseTargetMinVersion = sPathToTargetRoot + sSubPathWww + "/" + sSubPathReleaseTarget + "/" + sMajorVersion + "/" + sProductVersion + "/",
		
		sFileReleaseTargetFullVersion = sFolderReleaseTargetFullVersion + sReleaseNameFullVersion + ".zip",
		sFileReleaseTargetMinVersion = sFolderReleaseTargetMinVersion + sReleaseNameMinVersion + ".zip",
		
		sFolderLocalReleaseLibMin = sFolderLocalReleaseMinVersion + sSubPathWwwLib + "/" + sSubPathLibMin + "/",
		
		sFolderReleaseTargetLibMin = sPathToTargetRoot + sSubPathWwwLib + "/" + sSubPathLibMin + "/",
		sFolderReleaseTargetLibDocs = sPathToTargetRoot + sSubPathWwwDocs + "/" + sLibraryName + "/",
		
		sFileJsDocConfig = "./jsdoc-config.json";
		
		return {
			productVersion : sProductVersion,
			majorVersion : sMajorVersion,
			productName : sProductName,
			libraryName : sLibraryName,
			
			subLibraries : aSubLibraries,
			
			releaseNameFullVersion : sReleaseNameFullVersion,
			releaseNameMinVersion : sReleaseNameMinVersion,
			
			suffixDev : sSuffixDev,
			suffixAll : sSuffixAll,
			suffixMin : sSuffixMin,
			suffixPre : sSuffixPre,
			
			subPathWww : sSubPathWww,
			subPathRelease : sSubPathRelease,
			subPathWwwDocs : sSubPathWwwDocs,
			subPathWwwLib : sSubPathWwwLib,
			
			subPathReleaseTarget : sSubPathReleaseTarget,
			
			subPathLib : sSubPathLib,
			subPathLibDev : sSubPathLibDev,
			subPathLibAll : sSubPathLibAll,
			subPathLibMin : sSubPathLibMin,
			subPathLibPre : sSubPathLibPre,
			
			pathToRoot : sPathToRoot,
			pathToLibRoot : sPathToLibRoot,
			pathToDocsRoot : sPathToDocsRoot,
			pathToLocalReleaseRoot : sPathToLocalReleaseRoot,
			pathToTargetRoot : sPathToTargetRoot,
			
			folderLibDocs : sFolderLibDocs,
			folderLibDocsApi : sFolderLibDocsApi,
			
			folderLibDev : sFolderLibDev,
			folderLibAll : sFolderLibAll,
			folderLibMin : sFolderLibMin,
			folderLibPre : sFolderLibPre,
			
			folderLocalReleaseFullVersion : sFolderLocalReleaseFullVersion,
			folderLocalReleaseMinVersion : sFolderLocalReleaseMinVersion,
			
			fileLocalReleaseFullVersion : sFileLocalReleaseFullVersion,
			fileLocalReleaseMinVersion : sFileLocalReleaseMinVersion,
			
			folderReleaseTargetFullVersion : sFolderReleaseTargetFullVersion,
			folderReleaseTargetMinVersion : sFolderReleaseTargetMinVersion,
			
			fileReleaseTargetFullVersion : sFileReleaseTargetFullVersion,
			fileReleaseTargetMinVersion : sFileReleaseTargetMinVersion,
			
			folderLocalReleaseLibMin : sFolderLocalReleaseLibMin,
			
			folderReleaseTargetLibMin : sFolderReleaseTargetLibMin,
			folderReleaseTargetLibDocs : sFolderReleaseTargetLibDocs,
			
			fileJsDocConfig : sFileJsDocConfig
 		};
	}
		
		
		
};