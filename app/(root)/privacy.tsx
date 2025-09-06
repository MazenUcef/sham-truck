import RightIcon from '@/assets/icons/Driver/RightIcon';
import ThemedText from '@/components/ui/ThemedText';
import { getFontFamily } from '@/constants/fonts';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Privacy() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const getHeaderTitle = () => {
    return activeTab === 'privacy' ? 'سياسة الخصوصية' : 'شروط الاستخدام';
  };

  const PrivacyContent = () => (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>1. مقدمة</ThemedText>
        <Text style={styles.sectionText}>
          تحدد سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية عند استخدامك لتطبيق الهاتف المحمول الخاص بنا ("التطبيق") الذي يربط بين سائقي الشاحنات وأصحاب البضائع.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>2. المعلومات التي نجمعها</ThemedText>
        <Text style={styles.sectionText}>
          • المعلومات الشخصية التي تقدمها عند التسجيل على التطبيق، مثل الاسم ورقم الهاتف والبريد الإلكتروني.
        </Text>
        <Text style={styles.sectionText}>
          • معلومات عن المركبات والشاحنات الخاصة بسائقي الشاحنات.
        </Text>
        <Text style={styles.sectionText}>
          • معلومات عن البضائع التي يرغب أصحابها في نقلها.
        </Text>
        <Text style={styles.sectionText}>
          • معلومات عن استخدامك للتطبيق.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>3. استخدام المعلومات</ThemedText>
        <Text style={styles.sectionText}>
          • نستخدم المعلومات لربط سائقي الشاحنات بأصحاب البضائع.
        </Text>
        <Text style={styles.sectionText}>
          • نستخدم المعلومات لتحسين خدماتنا وتقديمها لك بشكل أفضل.
        </Text>
        <Text style={styles.sectionText}>
          • نستخدم المعلومات للتواصل معك حول خدماتنا.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>4. مشاركة المعلومات</ThemedText>
        <Text style={styles.sectionText}>
          • لا نبيع أو نشارك معلوماتك الشخصية مع طرف ثالث بدون موافقتك.
        </Text>
        <Text style={styles.sectionText}>
          • قد نشارك المعلومات مع سائقي الشاحنات أو أصحاب البضائع الذين تختار التعامل معهم.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>5. أمان المعلومات</ThemedText>
        <Text style={styles.sectionText}>
          • نحن نستخدم إجراءات أمان قياسية لحماية معلوماتك الشخصية.
        </Text>
        <Text style={styles.sectionText}>
          • نحن نضمن سرية وخصوصية معلوماتك.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>6. حقوقك</ThemedText>
        <Text style={styles.sectionText}>
          • لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها.
        </Text>
        <Text style={styles.sectionText}>
          • لديك الحق في طلب حذف معلوماتك الشخصية.
        </Text>
      </View>
    </ScrollView>
  );

  const TermsContent = () => (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>1. مقدمة</ThemedText>
        <Text style={styles.sectionText}>
          تحدد شروط الاستخدام هذه ("الشروط") استخدامك لتطبيق الهاتف المحمول الخاص بنا ("التطبيق") الذي يربط بين سائقي الشاحنات وأصحاب البضائع. من خلال استخدامك للتطبيق، فإنك توافق على هذه الشروط.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>2. استخدام التطبيق</ThemedText>
        <Text style={styles.sectionText}>
          • يجب أن تكون مسجلاً على التطبيق لاستخدام خدماتنا.
        </Text>
        <Text style={styles.sectionText}>
          • يجب أن تقدم معلومات دقيقة وكاملة عند التسجيل.
        </Text>
        <Text style={styles.sectionText}>
          • أنت مسؤول عن الحفاظ على سرية معلومات حسابك.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>3. دورنا</ThemedText>
        <Text style={styles.sectionText}>
          • نحن نربط سائقي الشاحنات بأصحاب البضائع.
        </Text>
        <Text style={styles.sectionText}>
          • لا نتدخل في المعاملات المالية بين سائقي الشاحنات وأصحاب البضائع.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>4. مسؤوليات المستخدم</ThemedText>
        <Text style={styles.sectionText}>
          • يجب أن تستخدم التطبيق لأغراض مشروعة فقط.
        </Text>
        <Text style={styles.sectionText}>
          • يجب أن تمتثل للقوانين واللوائح المعمول بها.
        </Text>
        <Text style={styles.sectionText}>
          • أنت مسؤول عن أي أضرار أو خسائر تنتج عن استخدامك للتطبيق.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>5. مسؤوليات سائقي الشاحنات</ThemedText>
        <Text style={styles.sectionText}>
          • يجب أن يكون سائقو الشاحنات مسجلين على التطبيق ويقدمون خدمات نقل حقيقية.
        </Text>
        <Text style={styles.sectionText}>
          • يجب أن يمتثلوا للقوانين واللوائح المعمول بها.
        </Text>
        <Text style={styles.sectionText}>
          • سائقو الشاحنات مسؤولون عن أي أضرار أو خسائر تنتج عن خدماتهم.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>6. إخلاء المسؤولية</ThemedText>
        <Text style={styles.sectionText}>
          • نحن لا نضمن جودة خدمات سائقي الشاحنات.
        </Text>
        <Text style={styles.sectionText}>
          • نحن لا نتحمل مسؤولية أي أضرار أو خسائر تنتج عن استخدامك للتطبيق أو خدمات سائقي الشاحنات.
        </Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>7. التغييرات في الشروط</ThemedText>
        <Text style={styles.sectionText}>
          • نحتفظ بالحق في تحديث هذه الشروط في أي وقت.
        </Text>
        <Text style={styles.sectionText}>
          • التغييرات ستكون سارية المفعول فور نشرها على التطبيق.
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>{getHeaderTitle()}</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <RightIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'privacy' && styles.activeTab]}
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>
            سياسة الخصوصية
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'terms' && styles.activeTab]}
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[styles.tabText, activeTab === 'terms' && styles.activeTabText]}>
            شروط الاستخدام
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {activeTab === 'privacy' ? <PrivacyContent /> : <TermsContent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9844A',
  },
  header: {
    paddingTop: 84,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 85,
    marginRight: 29,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 18,
    lineHeight: 24,
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#F9844A',
  },
  tabText: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 14,
    color: '#878A8E',
  },
  activeTabText: {
    color: 'white',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: getFontFamily('bold'),
    fontSize: 16,
    color: '#11171A',
    marginBottom: 12,
    textAlign: 'right',
  },
  sectionText: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    color: '#11171A',
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'right',
  },
});