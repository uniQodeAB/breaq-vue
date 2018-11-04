<template>
  <div
    id="map"
    ref="gmap"
    class="w-full h-full"></div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      map: null,
      mapMarkers: []
    }
  },

  watch: {
    markers: {
      handler () {
        this.clearMarkers()

        this.mapMarkers = this.markers.map(marker => new google.maps.Marker({
          position: marker.location,
          icon: {
            url: marker.photoURL,
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16)
          },
          map: this.map
        }))

        const centerMarker = this.markers.find(marker => marker.center)
        if (centerMarker && this.map) {
          this.map.setCenter(centerMarker.location)
        }
      },
      immediate: true,
      deep: true
    }
  },

  mounted () {
    /* global google */
    this.map = new google.maps.Map(this.$refs.gmap, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14
    })

    var myoverlay = new google.maps.OverlayView()
    myoverlay.draw = function () {
      // this assigns an id to the markerlayer Pane, so it can be referenced by CSS
      this.getPanes().markerLayer.id = 'markerLayer'
    }
    myoverlay.setMap(this.map)
  },

  methods: {
    clearMarkers () {
      this.mapMarkers.forEach(marker => marker.setMap(null))
      this.mapMarkers = []
    }
  }

}
</script>
