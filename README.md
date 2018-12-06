# COGS220Project

This web application was created as a project for COGS 220 in Fall 2018 (professor: [Jim Hollan](http://hci.ucsd.edu/hollan/)).

It's designed to visualize topics associated with news articles and tweets, and
enable comparison between these types of text (although it's adaptable to other
configurations of data, e.g. two sets of tweets).

It uses [EventDrops](https://marmelab.com/EventDrops/) and [D3.js](https://d3js.org/) to display two timelines simultaneously, in a synchronized manner (so that interactions that alter the timescale in one EventDrops chart are applied to the other EventDrops chart).

# Input Data

This currently retrieves the JSON files located at the URLs pointed to by
`tweet_file` and `news_file` in `code.js`. More detailed specs are forthcoming.

The code was based on Mike Bostock's EventDrops example for Observable
(link [here](https://beta.observablehq.com/@mbostock/hello-eventdrops)) and the
EventDrops demo's tooltip functionality (link [here](https://github.com/marmelab/EventDrops/tree/fc0d8ca4001156ddfc5738133b53bf479ffb190f/demo)).

Group members:
- Bharanidharan Radha Saseendrakumar
- Marcus Fedarko
- Siddharth Dinesh
