import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, CheckCircle2, AlertCircle, FileText, Upload, Search, Filter, Download, Mail, Phone, MapPin, Building, DollarSign, Calendar, Users, BarChart3, Activity, Award, ChevronRight, Eye, RefreshCw, Send, Check, X, Loader, Sparkles, Brain, Shield, Zap, ChevronDown, Home, Briefcase, CreditCard, Settings as SettingsIcon, LogOut } from 'lucide-react';

const MentyxPlatform = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showDecisionMemo, setShowDecisionMemo] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  // Application Form State
  const [applicationData, setApplicationData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanPurpose: '',
    businessType: '',
    yearEstablished: '',
    annualRevenue: ''
  });

  // Sample data
  const stats = [
    { label: 'Active Loans', value: '$12.4M', change: '+12%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Avg Decision Time', value: '2.3h', change: '-45%', icon: Clock, color: 'from-purple-500 to-pink-500' },
    { label: 'Approval Rate', value: '94%', change: '+8%', icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Borrowers', value: '156', change: '+23%', icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  const loans = [
    { id: 'L001', borrower: 'Acme Manufacturing Inc', amount: '$250,000', status: 'approved', riskScore: 85, type: 'Equipment Financing', date: '2024-11-01', documents: 8 },
    { id: 'L002', borrower: 'TechStart Solutions', amount: '$180,000', status: 'pending', riskScore: 72, type: 'Working Capital', date: '2024-11-03', documents: 6 },
    { id: 'L003', borrower: 'Green Energy Co', amount: '$500,000', status: 'review', riskScore: 88, type: 'Expansion Loan', date: '2024-11-02', documents: 10 },
    { id: 'L004', borrower: 'Metro Logistics LLC', amount: '$320,000', status: 'approved', riskScore: 91, type: 'Fleet Purchase', date: '2024-10-28', documents: 7 },
    { id: 'L005', borrower: 'Sunrise Hospitality', amount: '$420,000', status: 'pending', riskScore: 68, type: 'Property Renovation', date: '2024-11-04', documents: 9 },
    { id: 'L006', borrower: 'Peak Performance Gym', amount: '$150,000', status: 'rejected', riskScore: 45, type: 'Equipment', date: '2024-10-30', documents: 5 }
  ];

  const borrowers = [
    { id: 'B001', name: 'Acme Manufacturing Inc', contact: 'John Smith', email: 'john@acme.com', phone: '+1 555-0123', totalLoans: 3, activeLoans: 1, status: 'active' },
    { id: 'B002', name: 'TechStart Solutions', contact: 'Sarah Johnson', email: 'sarah@techstart.com', phone: '+1 555-0124', totalLoans: 1, activeLoans: 1, status: 'active' },
    { id: 'B003', name: 'Green Energy Co', contact: 'Michael Brown', email: 'michael@greenenergy.com', phone: '+1 555-0125', totalLoans: 2, activeLoans: 2, status: 'active' }
  ];

  const activities = [
    { action: 'Loan Approved', loan: 'L001 - Acme Manufacturing', time: '2 hours ago', type: 'success' },
    { action: 'Document Uploaded', loan: 'L002 - TechStart Solutions', time: '3 hours ago', type: 'info' },
    { action: 'Risk Analysis Completed', loan: 'L003 - Green Energy Co', time: '5 hours ago', type: 'info' },
    { action: 'Loan Rejected', loan: 'L006 - Peak Performance Gym', time: '1 day ago', type: 'warning' }
  ];

  const analysisSteps = [
    { label: 'Extracting Document Data', icon: FileText },
    { label: 'Analyzing Financial Statements', icon: BarChart3 },
    { label: 'Calculating Risk Score', icon: Shield },
    { label: 'Generating Decision Memo', icon: FileText }
  ];

  // Document AI simulation
  const simulateDocumentAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowDecisionMemo(true);
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-400';
      case 'pending': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-yellow-400';
      case 'review': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-400';
      case 'rejected': return 'from-red-500/20 to-pink-500/20 border-red-500/50 text-red-400';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) || loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setActiveView('document-ai');
    setTimeout(() => {
      simulateDocumentAnalysis();
    }, 500);
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="flex items-center text-xs text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activity
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-400">{activity.loan}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveView('borrower-portal')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                New Application
              </button>
              <button 
                onClick={() => setActiveView('pipeline')}
                className="w-full bg-white/10 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Pipeline
              </button>
              <button 
                onClick={() => setActiveView('analytics')}
                className="w-full bg-white/10 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </button>
            </div>
          </div>

          {/* AI Status */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Brain className="w-5 h-5 text-purple-400 mr-2" />
              <h3 className="text-white font-semibold">AI Engine Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Claude Sonnet 4.5</span>
                <span className="text-green-400 flex items-center"><Check className="w-3 h-3 mr-1" /> Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DeepSeek v3</span>
                <span className="text-green-400 flex items-center"><Check className="w-3 h-3 mr-1" /> Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">OCR Engine</span>
                <span className="text-green-400 flex items-center"><Check className="w-3 h-3 mr-1" /> Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Borrower Portal View
  const BorrowerPortalView = () => (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">New Loan Application</h2>
            <p className="text-gray-400">Complete the form below to apply for financing</p>
          </div>
        </div>

        <form onSubmit={handleApplicationSubmit} className="space-y-6">
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-400" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Business Name *</label>
                <input
                  type="text"
                  required
                  value={applicationData.businessName}
                  onChange={(e) => setApplicationData({...applicationData, businessName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={applicationData.contactName}
                  onChange={(e) => setApplicationData({...applicationData, contactName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Business Type *</label>
                <select
                  required
                  value={applicationData.businessType}
                  onChange={(e) => setApplicationData({...applicationData, businessType: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="">Select type</option>
                  <option value="llc">LLC</option>
                  <option value="corp">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole">Sole Proprietorship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year Established *</label>
                <input
                  type="number"
                  required
                  value={applicationData.yearEstablished}
                  onChange={(e) => setApplicationData({...applicationData, yearEstablished: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="2020"
                />
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-400" />
              Loan Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Amount *</label>
                <input
                  type="number"
                  required
                  value={applicationData.loanAmount}
                  onChange={(e) => setApplicationData({...applicationData, loanAmount: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="250000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Annual Revenue *</label>
                <input
                  type="number"
                  required
                  value={applicationData.annualRevenue}
                  onChange={(e) => setApplicationData({...applicationData, annualRevenue: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="1000000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Purpose *</label>
                <textarea
                  required
                  value={applicationData.loanPurpose}
                  onChange={(e) => setApplicationData({...applicationData, loanPurpose: e.target.value})}
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Describe how you plan to use the loan funds"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Upload className="w-5 h-5 mr-2 text-purple-400" />
              Required Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-center text-sm text-gray-400">Tax Returns (Last 2 years)</p>
                <p className="text-center text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-center text-sm text-gray-400">Bank Statements (Last 6 months)</p>
                <p className="text-center text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-center text-sm text-gray-400">Financial Statements</p>
                <p className="text-center text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-center text-sm text-gray-400">Business License</p>
                <p className="text-center text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Application
            </button>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className="px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Document AI View
  const DocumentAIView = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Document Analysis</h2>
              <p className="text-gray-400">Powered by Claude Sonnet 4.5 & DeepSeek v3</p>
            </div>
          </div>
          {!isAnalyzing && !showDecisionMemo && (
            <button
              onClick={simulateDocumentAnalysis}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Documents
            </button>
          )}
        </div>

        {/* Analysis Steps */}
        {isAnalyzing && (
          <div className="space-y-4 mb-8">
            {analysisSteps.map((step, idx) => (
              <div key={idx} className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                idx <= analysisStep ? 'bg-white/10' : 'bg-white/5'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  idx < analysisStep ? 'bg-green-500' : idx === analysisStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`}>
                  {idx < analysisStep ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : idx === analysisStep ? (
                    <Loader className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <step.icon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{step.label}</div>
                  {idx === analysisStep && (
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decision Memo */}
        {showDecisionMemo && (
          <div className="space-y-6 animate-fadeIn">
            {/* Risk Score Card */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-green-400" />
                  Risk Assessment
                </h3>
                <div className="text-4xl font-bold text-green-400">85/100</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-sm text-gray-400">Credit Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">$1.2M</div>
                  <div className="text-sm text-gray-400">Annual Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3.2x</div>
                  <div className="text-sm text-gray-400">Debt Coverage</div>
                </div>
              </div>
            </div>

            {/* Extracted Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-400" />
                  Tax Returns Analysis
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">2023 Revenue</span>
                    <span className="text-white font-medium">$1,235,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">2022 Revenue</span>
                    <span className="text-white font-medium">$987,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Growth Rate</span>
                    <span className="text-green-400 font-medium">+25.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Net Profit Margin</span>
                    <span className="text-white font-medium">18.3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Bank Statements Analysis
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Monthly Balance</span>
                    <span className="text-white font-medium">$185,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cash Flow Trend</span>
                    <span className="text-green-400 font-medium">Positive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">NSF Incidents</span>
                    <span className="text-green-400 font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Age</span>
                    <span className="text-white font-medium">4.5 years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-blue-400" />
                AI Recommendation
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-1" />
                  <p className="text-white">Strong financial performance with consistent revenue growth</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-1" />
                  <p className="text-white">Excellent cash flow management and debt coverage ratio</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-1" />
                  <p className="text-white">No red flags in bank statements or credit history</p>
                </div>
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 font-semibold text-lg">Recommended for Approval</p>
                  <p className="text-white mt-2">Suggested loan amount: $250,000 at 7.5% APR for 5 years</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center">
                <Check className="w-5 h-5 mr-2" />
                Approve Loan
              </button>
              <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center">
                <X className="w-5 h-5 mr-2" />
                Reject Loan
              </button>
              <button className="px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Pipeline View
  const PipelineView = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-white">Loan Pipeline</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="review">Under Review</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredLoans.map((loan) => (
          <div
            key={loan.id}
            onClick={() => setSelectedLoan(loan)}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">{loan.id}</div>
                <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{loan.borrower}</div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getStatusColor(loan.status)} border`}>
                {loan.status.toUpperCase()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Loan Amount</div>
                <div className="text-xl font-bold text-white">{loan.amount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Risk Score</div>
                <div className={`text-xl font-bold ${getRiskColor(loan.riskScore)}`}>{loan.riskScore}/100</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <FileText className="w-4 h-4 mr-1" />
                {loan.documents} documents
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {loan.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Analytics View
  const AnalyticsView = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Approval Trends
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-400" />
            Processing Time
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Activity className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
            Loan Type Distribution
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-400" />
            Risk Assessment
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Borrowers View
  const BorrowersView = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white">Borrower Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {borrowers.map((borrower) => (
          <div
            key={borrower.id}
            onClick={() => setSelectedBorrower(borrower)}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 rounded-lg text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                ACTIVE
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{borrower.name}</h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                {borrower.email}
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                {borrower.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-xs text-gray-400 mb-1">Total Loans</div>
                <div className="text-lg font-bold text-white">{borrower.totalLoans}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Active</div>
                <div className="text-lg font-bold text-green-400">{borrower.activeLoans}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Settings View
  const SettingsView = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary AI Model</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white">
                <option>Claude Sonnet 4.5</option>
                <option>GPT-4</option>
                <option>DeepSeek v3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Threshold</label>
              <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Two-Factor Authentication</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Email Notifications</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">SMS Alerts</span>
              <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mentyx.ai</h1>
              <p className="text-gray-400 text-sm">AI-Powered Loan Origination Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white font-medium">Thomas Plesa</div>
              <div className="text-sm text-gray-400">Admin</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              TP
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'borrower-portal', label: 'New Application', icon: FileText },
              { id: 'pipeline', label: 'Loan Pipeline', icon: Briefcase },
              { id: 'document-ai', label: 'Document AI', icon: Brain },
              { id: 'borrowers', label: 'Borrowers', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: SettingsIcon }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setShowDecisionMemo(false);
                  setIsAnalyzing(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div>
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'borrower-portal' && <BorrowerPortalView />}
          {activeView === 'pipeline' && <PipelineView />}
          {activeView === 'document-ai' && <DocumentAIView />}
          {activeView === 'borrowers' && <BorrowersView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'settings' && <SettingsView />}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Mentyx.ai - All rights reserved</p>
          <p className="mt-1">Powered by Claude Sonnet 4.5 & DeepSeek v3</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MentyxPlatform;
