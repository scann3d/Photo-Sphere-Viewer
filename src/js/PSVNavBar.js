/**
 * Navigation bar class
 * @param psv (PhotoSphereViewer) A PhotoSphereViewer object
 */
function PSVNavBar(psv) {
  PSVComponent.call(this, psv);

  this.config = this.psv.config.navbar;
  this.items = [];

  if (this.config === true) {
    this.config = PSVUtils.clone(PhotoSphereViewer.DEFAULTS.navbar);
  }
  else if (typeof this.config == 'string') {
    this.config = this.config.split(' ');
  }
  else if (!Array.isArray(this.config)) {
    this.config = Object.keys(this.config);
  }

  this.create();
}

PSVNavBar.prototype = Object.create(PSVComponent.prototype);
PSVNavBar.prototype.constructor = PSVNavBar;

PSVNavBar.className = 'psv-navbar';

/**
 * Creates the navbar
 * @return (void)
 */
PSVNavBar.prototype.create = function() {
  PSVComponent.prototype.create.call(this);

  this.config.forEach(function(button) {
    if (typeof button == 'object') {
      this.items.push(new PSVNavBarCustomButton(this, button));
    }
    else {
      switch (button) {
        case 'autorotate':
          this.items.push(new PSVNavBarAutorotateButton(this));
          break;

        case 'zoom':
          this.items.push(new PSVNavBarZoomButton(this));
          break;

        case 'download':
          this.items.push(new PSVNavBarDownloadButton(this));
          break;

        case 'markers':
          this.items.push(new PSVNavBarMarkersButton(this));
          break;

        case 'fullscreen':
          this.items.push(new PSVNavBarFullscreenButton(this));
          break;

        case 'caption':
          this.items.push(new PSVNavBarCaption(this, this.psv.config.caption));
          break;

        case 'spacer':
          button = 'spacer-5';
        /* falls through */
        default:
          var matches = button.match(/spacer\-([0-9]+)/);
          if (matches !== null) {
            this.items.push(new PSVNavBarSpacer(this, matches[1]));
          }
          else {
            throw new PSVError('Unknown button ' + button);
          }
          break;
      }
    }
  }, this);
};

/**
 * Destroys the navbar
 */
PSVNavBar.prototype.destroy = function() {
  this.items.forEach(function(item) {
    item.destroy();
  });

  this.items.length = 0;

  PSVComponent.prototype.destroy.call(this);
};
