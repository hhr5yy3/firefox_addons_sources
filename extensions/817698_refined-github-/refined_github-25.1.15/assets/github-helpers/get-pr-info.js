import api from './api.js';
import { getConversationNumber } from './index.js';

async function getPrInfo(base, number = getConversationNumber()) {
	const {repository} = await api.v4uncached(`
		repository() {
			pullRequest(number: ${number}) {
				baseRefOid
				headRefOid
				mergeable
				viewerCanUpdate
				viewerCanEditFiles
				headRef {
					compare(headRef: "${base}") {
						status
						aheadBy
					}
				}
			}
		}
	`);

	const {
		baseRefOid,
		headRefOid,
		mergeable,
		viewerCanUpdate,
		viewerCanEditFiles,
		headRef,
	} = repository.pullRequest;
	return {
		baseRefOid,
		headRefOid,
		viewerCanUpdate,
		mergeable,
		viewerCanEditFiles,
		// The comparison in the API is base -> head, so it must be flipped
		behindBy: headRef.compare.aheadBy,
		needsUpdate: headRef.compare.status === 'DIVERGED',
	};
}

export { getPrInfo as default };
