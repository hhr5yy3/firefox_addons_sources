const Modal = {
  showCustomModal(messageKey, showConfirmButtons = false, callback, isCritical = false) {

    const modal = document.getElementById('custom-confirm-modal');
    const modalContent = modal.querySelector('.modal-content');
    const confirmButton = document.getElementById('modal-confirm');
    const cancelButton = document.getElementById('modal-cancel');

    // Apply critical styling if `isCritical` is true
    if (isCritical) {
      modalContent.classList.add('critical-modal');
    } else {
      modalContent.classList.remove('critical-modal');
    }

    // Set the modal message
    document.getElementById('modal-message').textContent = coreAPI.i18n.getMessage(messageKey);

    // Show or hide confirm/cancel buttons
    confirmButton.style.display = cancelButton.style.display = showConfirmButtons ? 'inline-block' : 'none';

    // Button behaviors
    confirmButton.onclick = () => Modal.closeModal(callback, true);
    cancelButton.onclick = () => Modal.closeModal(callback, false);

    // Close modal if clicking outside when not confirmable
    modal.onclick = (event) => {
      if (!showConfirmButtons && !modalContent.contains(event.target)) {
        Modal.closeModal(callback, false);
      }
    };

    // Display the modal
    modal.style.display = 'block';

    // Auto-close notification modals if not confirmable
    if (!showConfirmButtons) setTimeout(() => Modal.closeModal(callback, false), 3000);
  },

  closeModal(callback, result) {
    const modal = document.getElementById('custom-confirm-modal');
    modal.style.display = 'none';
    modal.querySelector('.modal-content').classList.remove('critical-modal'); // Reset critical class
    if (callback) callback(result);
  },
};
