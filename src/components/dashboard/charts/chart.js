import "document-register-element";
import $ from "jquery";
import template from "./chart.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"
import Chart from "chart.js";

export default class DashboardChart extends HTMLElement
{
	constructor(inName = "Chart", inData = {type:"line", data: [1,2,3,4,5], labels : ["1","2","3"]})
	{
		super();
		this.innerHTML = template;
		this.classList.add("container-fluid");
		this._mType = inData.type;
		this._mName = inName;
		this._mData = inData;
		this._mNameEl = $(this).find("strong")[0];
		this._mChartEl = $(this).find("canvas")[0];
		this._mName.innerHTML = this._mName;
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{

	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		let chartInfo = getLineChartConfig();
		chartInfo.data.labels = this._mData.labels;
		chartInfo.data.datasets[0].data = this._mData.data;
		// this._mChart = new Chart(this._mChartEl, chartInfo);
		this._mChart =  new Chart(this._mChartEl, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
							"#864DD9",
							"#37cfdc",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)"
            ],
            borderColor: [
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)",
							"rgba(134, 77, 217, 0.57)"
            ],
						hoverBackgroundColor: [
								"rgba(134, 77, 217, 0.2)",
								"rgba(134, 77, 217, 0.2)",
								"rgba(134, 77, 217, 0.2)",
								"rgba(134, 77, 217, 0.2)",
								"rgba(134, 77, 217, 0.2)",
								"rgba(134, 77, 217, 0.2)"
						],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
	}

}

customElements.define("crwnrr-dashboard-chart", DashboardChart);

function getLineChartConfig()
{
  let config =  {
          type: 'line',
          options: {
              scales: {
                  xAxes: [{
                      display: true,
                      gridLines: {
                          display: false
                      }
                  }],
                  yAxes: [{
                      ticks: {
                          max: 60,
                          min: 10
                      },
                      display: true,
                      gridLines: {
                          display: false
                      }
                  }]
              },
              legend: {
                  display: true
              }
          },
          data: {
              labels: [],
              datasets:
              [
                  {
                      label: "Dataset Name",
                      fill: true,
                      lineTension: 0.2,
                      backgroundColor: "transparent",
                      borderColor: '#864DD9',
                      pointBorderColor: '#864DD9',
                      pointHoverBackgroundColor: '#864DD9',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      borderWidth: 2,
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 5,
                      pointHoverRadius: 5,
                      pointHoverBorderColor: "#fff",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 0,
                      data: [],
                      spanGaps: false
                  }
              ]
          }
      };
      return config;
}
