
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import SEO from '@/components/SEO';
import dataService from '@/services/DataService';
import { Calendar, Globe, Tag, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InitiativeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const initiative = dataService.getInitiativeById(id || '');

  if (!initiative) {
    return (
      <Container className="py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Initiative not found</h1>
          <p className="mt-2 text-gray-600">The initiative you're looking for doesn't exist or has been removed.</p>
        </div>
      </Container>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Upcoming':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Container className="py-8">
      <SEO
        title={`${initiative.name} | Deep Learning in Radiotherapy`}
        description={`Learn about ${initiative.name}, a ${initiative.category} in radiotherapy`}
        canonical={`https://dlinrt.eu/initiative/${id}`}
      />
      
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className={getStatusColor(initiative.status)}>
                {initiative.status}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                {initiative.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">{initiative.name}</h1>
            
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>
                  {initiative.startDate ? (
                    <>
                      {formatDate(initiative.startDate)}
                      {initiative.endDate && ` - ${formatDate(initiative.endDate)}`}
                    </>
                  ) : (
                    'Date not specified'
                  )}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-5 w-5" />
                <span>{initiative.organization}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700">{initiative.description}</p>
            </div>
            
            {initiative.website && (
              <div className="mt-6">
                <a 
                  href={initiative.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                  Visit initiative website
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            )}
            
            {initiative.tags && initiative.tags.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-semibold">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {initiative.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {initiative.features && initiative.features.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Features</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {initiative.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {initiative.dataAccess && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Data Access</h2>
                <p className="text-gray-700">{initiative.dataAccess}</p>
              </div>
            )}
            
            {initiative.participationInfo && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">How to Participate</h2>
                <p className="text-gray-700">{initiative.participationInfo}</p>
              </div>
            )}
          </div>
        </div>
        
        {initiative.relatedPublications && initiative.relatedPublications.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Related Publications</h2>
            </div>
            <div className="space-y-4">
              {initiative.relatedPublications.map((publication, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{publication.title}</h3>
                  <p className="text-gray-600 mt-1">{publication.authors} ({publication.year})</p>
                  {publication.url && (
                    <a 
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                    >
                      View publication
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default InitiativeDetails;
