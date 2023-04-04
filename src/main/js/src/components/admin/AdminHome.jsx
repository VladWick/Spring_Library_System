import React, { useEffect, useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import Box from '@mui/material/Box';

import { Bar, Pie } from 'react-chartjs-2';

import Loader from '../Loader';

import Chart from 'chart.js/auto';

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};


const AdminHome = () => {
    const [isLoading, setLoading] = useState(true);
    const [languageData, setLanguageData] = useState();
    const [readAvailableData, setReadAvailableData] = useState();

    useEffect(() => {
        const getLanguageData = async () => {  
          const data_resp = await fetch('http://localhost:8080/api/v1/books/languages/map');
          const data_responseJson = await data_resp.json()
          setLanguageData(data_responseJson);

          const read_available_resp = await fetch('http://localhost:8080/api/v1/books/available');
          const read_available_responseJson = await read_available_resp.json()
          setReadAvailableData(read_available_responseJson);

          setLoading(false);
        }
        getLanguageData();
    }, []);

    if (isLoading) {
        return <Loader/>;
    } else {
        return (
            <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
                <AdminNavbar/>
                <Box sx={{  }}>
                    <Box sx={{ width: "80%", margin: "15px"}}>
                        <Box sx={{ 
                            display: "flex",
                            alignItems: "center", 
                            fontWeight: "bold",
                            fontSize: "22px",
                            padding: "10px",
                            paddingLeft: "30px",
                            marginBottom: "10px",
                            color: "#684536"
                            }}
                        >
                            Amount of books that is available to read
                        </Box>
                        <Bar data = {
                                {
                                    labels: ['Link to read'],
                                    datasets: [
                                        {
                                        axis: 'x',
                                        label: 'Available',
                                        data: [readAvailableData.available],
                                        // data: [65],
                                        fill: false,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)'
                                        ],
                                        borderWidth: 1
                                    },
                                    {
                                        axis: 'x',
                                        label: 'Not available',
                                        data: [readAvailableData.not_available],
                                        // data: [65],
                                        fill: false,
                                        backgroundColor: [
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 159, 64)'
                                        ],
                                        borderWidth: 1
                                    }
                                    ],
                                }
                            }
                        />
                    </Box>

                    <Box sx={{ width: "80%", margin: "15px" }}>
                        <Box sx={{ 
                            display: "flex",
                            alignItems: "center", 
                            fontWeight: "bold",
                            fontSize: "22px",
                            padding: "10px",
                            paddingLeft: "30px",
                            marginBottom: "10px",
                            color: "#684536"
                            }}
                        >
                            Languages and their number
                        </Box>
                        <Pie data = {
                                {
                                    labels: languageData.map((lg) => (lg.language)),
                                    datasets: [
                                        {
                                            label: ['Language'],
                                            data: languageData.map((lg) => (lg.amount)),
                                            backgroundColor: Object.values(CHART_COLORS),
                                        }
                                    ]
                                }
                            }
                        />
                    </Box>

                </Box>
            </Box>
        );
    }
};

export default AdminHome;