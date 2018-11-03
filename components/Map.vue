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

  // computed: {
  //   mapMarkers () {
  //     // this.clearMarkers()

  //     return this.markers.map(marker => new google.maps.Marker({
  //       position: marker.location,
  //       map: this.map
  //     }))
  //   }
  // },

  watch: {
    markers: {
      handler () {
        this.clearMarkers()

        this.mapMarkers = this.markers.map(marker => new google.maps.Marker({
          position: marker.location,
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
  },

  methods: {
    // addMarker () {
    //   this.markers.push(new google.maps.Marker({
    //     position: this.location,
    //     map: this.map
    //   }))

    //   this.map.setCenter(this.location)
    // },

    clearMarkers () {
      this.mapMarkers.forEach(marker => marker.setMap(null))
      this.mapMarkers = []
    }
  }

}
</script>
