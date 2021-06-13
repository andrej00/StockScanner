<script>
import { Pie } from "vue-chartjs";
import { mapGetters, mapActions } from "vuex";
var colorArray = [
  "#3F51B5",
  "#009688",
  "#2E7D32",
  "#37474F",
  "#4CAF50",
  "#C62828",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];
export default {
  extends: Pie,
  name: "Portfolio",
  data() {
    return {};
  },
  mounted() {
    const length = Object.keys(this.getUser.database.portfolio).length;
    const colors = colorArray.slice(0, length + 1);
    this.renderChart(
      {
        labels: Object.keys(this.getUser.database.portfolio),
        datasets: [
          {
            backgroundColor: colors,
            data: Object.values(this.getUser.database.portfolio), 
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
};
</script>

<style>
</style>
