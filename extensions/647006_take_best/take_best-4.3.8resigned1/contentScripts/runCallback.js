if (!this.chrome && !this.opera) {
    console.log("scripts injected for ff");
    self.postMessage("scripts injected", null, null);
}
