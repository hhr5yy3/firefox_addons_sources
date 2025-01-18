import importedFeaturesRaw from './imported-features.json.js';
import featuresMetasRaw from './features-meta.json.js';
import renamedFeatures from './feature-renames.json.js';

// Run `npm run vitest` to update these files

const importedFeatures = importedFeaturesRaw ;
const featuresMeta = featuresMetasRaw ;

function getNewFeatureName(possibleFeatureName) {
	// @ts-expect-error Useless "no index type" error as usual
	const newFeatureName = renamedFeatures[possibleFeatureName]  ?? possibleFeatureName;
	return importedFeatures.includes(newFeatureName) ? newFeatureName : undefined;
}

export { featuresMeta, getNewFeatureName, importedFeatures, renamedFeatures };
