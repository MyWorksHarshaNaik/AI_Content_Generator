"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'

function CreateNewContent() {

  const params = useParams();
  const templateSlug = params['template-slug'];
  
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>('');

  const {user} = useUser();
  const router = useRouter();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext); 
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
  const {updateCreditUsage, setupdateCreditUsage} = useContext(UpdateCreditUsageContext);

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
    );

    // used to generate content from AI
    const GenerateAIContent =async (formData:any)=>{
      if(totalUsage>=10000&&!userSubscription){
        console.log("Please Upgrade")
        router.push('/dashboard/billing')
        return;
      }
      setLoading(true);
      const SlectedPrompt = selectedTemplate?.aiPrompt;

      const FinalAIPrompt = JSON.stringify(formData)+", "+SlectedPrompt;

      const result = await chatSession.sendMessage(FinalAIPrompt);

      setAIOutput(result?.response.text());
      await SaveInDb(formData, selectedTemplate?.slug, result?.response.text())
      setLoading(false);

      setupdateCreditUsage(Date.now());
    }

  const SaveInDb=async(formData:any, slug:any, aiResp:string)=>{
    const result = await db.insert(AIOutput).values({
      formData:formData,
      templateSlug:slug,
      aiResponse:aiResp,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD/MM/yyyy'),
    })

    console.log(result);
  }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
        <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-5'>
          {/* form section */}
          <FormSection 
            selectedTemplate={selectedTemplate}
            userFormInput={(v:any)=>GenerateAIContent(v)}
            loading={loading}
          />

          {/* output section */}
          <div className='col-span-2'>
            <OutputSection aiOutput={aiOutput}/>
          </div>
      </div>
    </div>
  )
}

export default CreateNewContent