<template>
  <div
    id="map"
    ref="gmap"
    class="w-full"></div>
</template>

<script>
export default {
  props: ['location'],

  data () {
    return {
      map: null,
      markers: []
    }
  },

  watch: {
    location () {
      this.clearMarkers()
      this.addMarker()
    }
  },

  mounted () {
    /* global google */

    this.map = new google.maps.Map(this.$refs.gmap, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14
    })

    if (this.location) {
      this.addMarker()
    }
  },

  methods: {
    addMarker () {
      this.markers.push(new google.maps.Marker({
        position: this.location,
        map: this.map
      }))

      this.map.setCenter(this.location)
    },

    clearMarkers () {
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
    }
  }

}
</script>
