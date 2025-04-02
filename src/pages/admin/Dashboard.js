// Dashboard.js
import { useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats] = useState([
    { title: 'Total Users', value: '2,453', change: '+12%', trend: 'up' },
    { title: 'Active Sessions', value: '1,234', change: '+5%', trend: 'up' },
    { title: 'Pending Tasks', value: '32', change: '-3%', trend: 'down' },
    { title: 'Revenue', value: '$8,450', change: '+24%', trend: 'up' }
  ]);

  const [recentActivities] = useState([
    { user: 'John Doe', action: 'created new project', time: '2 mins ago' },
    { user: 'Sarah Smith', action: 'updated settings', time: '10 mins ago' },
    { user: 'Mike Johnson', action: 'completed task', time: '1 hour ago' },
    { user: 'Emily Wilson', action: 'uploaded files', time: '3 hours ago' }
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            style={styles.statCard}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div style={styles.statContent}>
              <p style={styles.statTitle}>{stat.title}</p>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <div style={{
                ...styles.statChange,
                color: stat.trend === 'up' ? '#10B981' : '#EF4444'
              }}>
                {stat.change}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={stat.trend === 'up' ? '#10B981' : '#EF4444'} 
                  strokeWidth="2"
                  style={{ marginLeft: '4px' }}
                >
                  {stat.trend === 'up' ? (
                    <path d="M5 15l7-7 7 7"></path>
                  ) : (
                    <path d="M19 9l-7 7-7-7"></path>
                  )}
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={styles.contentGrid}>
        {/* Recent Activities */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Activities</h3>
          <div style={styles.activitiesList}>
            {recentActivities.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <div style={styles.avatar}>
                  {activity.user.charAt(0).toUpperCase()}
                </div>
                <div style={styles.activityContent}>
                  <p style={styles.activityText}>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <p style={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Quick Stats</h3>
          <div style={styles.chartPlaceholder}>
            <p style={styles.placeholderText}>Performance Chart</p>
          </div>
          <div style={styles.summaryStats}>
            <div style={styles.summaryItem}>
              <p style={styles.summaryLabel}>Avg. Session</p>
              <p style={styles.summaryValue}>4m 23s</p>
            </div>
            <div style={styles.summaryItem}>
              <p style={styles.summaryLabel}>Bounce Rate</p>
              <p style={styles.summaryValue}>34.5%</p>
            </div>
            <div style={styles.summaryItem}>
              <p style={styles.summaryLabel}>New Users</p>
              <p style={styles.summaryValue}>1,024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div style={{ ...styles.card, marginTop: '24px' }}>
        <h3 style={styles.cardTitle}>Recent Tasks</h3>
        <div style={styles.taskList}>
          <div style={styles.taskItem}>
            <div style={styles.taskCheckbox}></div>
            <div style={styles.taskContent}>
              <p style={styles.taskText}>Update documentation</p>
              <p style={styles.taskMeta}>Due tomorrow</p>
            </div>
            <div style={styles.taskPriority}></div>
          </div>
          <div style={styles.taskItem}>
            <div style={styles.taskCheckbox}></div>
            <div style={styles.taskContent}>
              <p style={styles.taskText}>Review pull requests</p>
              <p style={styles.taskMeta}>3 pending</p>
            </div>
            <div style={styles.taskPriority}></div>
          </div>
          <div style={styles.taskItem}>
            <div style={styles.taskCheckbox}></div>
            <div style={styles.taskContent}>
              <p style={styles.taskText}>Prepare quarterly report</p>
              <p style={styles.taskMeta}>Due in 3 days</p>
            </div>
            <div style={styles.taskPriority}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '24px'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statTitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 500,
    margin: 0
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0'
  },
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: '#111827'
  },
  activityContent: {
    flex: 1
  },
  activityText: {
    margin: 0,
    fontSize: '14px',
    color: '#111827'
  },
  activityTime: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#6B7280'
  },
  chartPlaceholder: {
    height: '200px',
    backgroundColor: '#F3F4F6',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: '14px'
  },
  summaryStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  summaryItem: {
    textAlign: 'center'
  },
  summaryLabel: {
    fontSize: '12px',
    color: '#6B7280',
    margin: '0 0 4px 0'
  },
  summaryValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#F9FAFB',
    transition: 'all 0.2s ease'
  },
  taskCheckbox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '2px solid #E5E7EB',
    cursor: 'pointer'
  },
  taskContent: {
    flex: 1
  },
  taskText: {
    margin: 0,
    fontSize: '14px',
    color: '#111827'
  },
  taskMeta: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#6B7280'
  },
  taskPriority: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6'
  }
};

export default Dashboard;