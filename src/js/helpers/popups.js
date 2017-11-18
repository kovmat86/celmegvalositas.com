/* global $ */
function hideModal(modalId) {
  const $modal = $(`#${modalId}`);
  return new Promise(resolve => {
    $modal.one('hidden.bs.modal', () => {
      resolve();
    });
    $modal.modal('hide');
  });
}

function showModal(modalId) {
  const $modal = $(`#${modalId}`);
  return new Promise(resolve => {
    $modal.one('shown.bs.modal', () => {
      resolve();
    });
    $modal.modal('show');
  });      
}


export { hideModal, showModal };
